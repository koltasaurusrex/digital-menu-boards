import React, { Component } from 'react'
import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:5555',
    headers: { }
})

type Flavor = {
    id: number;
    name: string;
};

class GetFlavors extends Component { 

    state = {
        flavors: [] as Flavor[]
    }

    constructor(props: any){ 
        super(props) 
            
        api.get('/flavors').then(res => {
            this.setState({flavors: res.data})
        })
    } 

      
    render(){ 
        return (
            <div>
            <h2>Flavors</h2>
            <div> 
                <ul>
                    {this.state.flavors.map(flavor => <li key={flavor.id}>{flavor.name}</li>)}
                </ul>
            </div>
            </div>
    
        );
    } 
} 
    
export default GetFlavors;