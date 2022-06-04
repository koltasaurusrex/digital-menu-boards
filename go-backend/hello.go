package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

var name string
var id int

type Flavor struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

func main() {

	urlPostgres := "postgres://postgres:root@postgresql:5432/postgres"
	conn, err := pgx.Connect(context.Background(), urlPostgres)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())
	r := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3000"}
	// To be able to send tokens to the server.
	corsConfig.AllowCredentials = true
	// OPTIONS method for ReactJS
	corsConfig.AddAllowMethods("OPTIONS")
	// Register the middleware
	r.Use(cors.New(corsConfig))

	r.GET("/flavors", listAllFlavors)
	r.POST("/flavors", createFlavor)
	// r.GET("/flavors/:flavor_id")
	// r.DELETE("/flavors/:flavor_id")

	r.LoadHTMLGlob("templates/*")
	//router.LoadHTMLFiles("templates/template1.html", "templates/template2.html")
	r.GET("/", func(c *gin.Context) {
		err = conn.QueryRow(context.Background(), "select id, name from flavors where id=$1", 2).Scan(&id, &name)
		c.JSON(http.StatusOK, gin.H{
			"id":    id,
			"name":  name,
			"title": "Dope Town Central Square",
		})
	})

	r.DELETE("/flavors/:flavor_id", func(c *gin.Context) {
		id := c.Param("flavor_id")
		fmt.Fprint(os.Stdout, "ID = ", id, "\n")
		response, err := conn.Query(context.Background(), "DELETE FROM flavors WHERE id = $1", id)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Delete flavor failed: %v\n", err)
			os.Exit(1)
		}
		_ = response

		// return http response
		c.JSON(http.StatusOK, gin.H{
			"status":  200,
			"message": "flavor successfully deleted",
			"flavor":  id,
		})
	})

	r.GET("/flavors/:flavor_id", func(c *gin.Context) {
		// query db for all flavors
		err := conn.QueryRow(context.Background(), "select * from flavors where id = $1", id).Scan(&id, &name)
		if err != nil {
			fmt.Fprintf(os.Stderr, "List flavor failed: %v\n", err)
			os.Exit(1)
		}
		flavor := Flavor{
			Id:   id,
			Name: name,
		}
		// return http response
		c.IndentedJSON(http.StatusOK, gin.H{
			"data": flavor,
		})
	})

	r.Run(":5555") // listen and serve on 0.0.0.0:5555
}

func listAllFlavors(c *gin.Context) {
	// query db for all flavors
	urlPostgres := "postgres://postgres:root@postgresql:5432/postgres"
	conn, err := pgx.Connect(context.Background(), urlPostgres)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())
	data, err := conn.Query(context.Background(), "select * from flavors")
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}
	// structure returned json
	jsonedData := []Flavor{}
	for data.Next() {
		data.Scan(&id, &name)
		flavor := Flavor{
			Id:   id,
			Name: name,
		}
		jsonedData = append(jsonedData, flavor)
	}
	// return http response
	c.IndentedJSON(http.StatusOK, jsonedData)
}

func createFlavor(c *gin.Context) {

	urlPostgres := "postgres://postgres:root@postgresql:5432/postgres"

	conn, err := pgx.Connect(context.Background(), urlPostgres)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	var flavor Flavor
	if err := c.BindJSON(&flavor); err != nil {
		fmt.Fprintf(os.Stderr, "Bind flavor failed: %v\n", err)
	}

	response, err := conn.Query(context.Background(), "INSERT INTO flavors (name) VALUES ($1)", flavor.Name)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Create flavor failed: %v\n", err)
	}
	_ = response
	c.JSON(http.StatusOK, gin.H{
		"status":  200,
		"message": "flavor successfully created",
		"flavor":  flavor.Name,
	})
}
