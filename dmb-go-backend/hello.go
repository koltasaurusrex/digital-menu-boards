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

// func postFunct() {
// 	var newAlbum album
//
// 	// Call BindJSON to bind the received JSON to
// 	// newAlbum.
// 	if err := c.BindJSON(&newAlbum); err != nil {
// 		return
// 	}
//
// 	// Add the new album to the slice.
// 	albums = append(albums, newAlbum)
// 	c.IndentedJSON(http.StatusCreated, newAlbum)
// }

func main() {

	urlPostgres := "postgres://postgres:kh891@localhost:5432/postgres"
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

	var name string
	var id int

	type Flavor struct {
		Id   int    `json:"id"`
		Name string `json:"name"`
	}

	r.LoadHTMLGlob("templates/*")
	//router.LoadHTMLFiles("templates/template1.html", "templates/template2.html")
	r.GET("/", func(c *gin.Context) {
		err = conn.QueryRow(context.Background(), "select id, name from flavors where id=$1", 2).Scan(&id, &name)
		c.HTML(http.StatusOK, "index.html", gin.H{
			"id":    id,
			"name":  name,
			"title": "Dope Town Central",
		})
	})

	r.GET("/flavors", func(c *gin.Context) {
		// query db for all flavors
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

	r.POST("/flavors", func(c *gin.Context) {
		var flavor Flavor
		if err := c.BindJSON(&flavor); err != nil {
			fmt.Fprintf(os.Stderr, "Bind flavor failed: %v\n", err)
		}
		err := conn.QueryRow(context.Background(), "INSERT INTO flavors (name) VALUES ($1)", flavor.Name)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Create flavor failed: %v\n", err)
		}
	})

	r.Run(":5555") // listen and serve on 0.0.0.0:8080
}
