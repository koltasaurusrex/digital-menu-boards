import React, { Component } from 'react'
import axios from "axios"
import FlavorTable from './FlavorTable';
import { Flavor } from '../types'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: { }
})

export default class GetFlavors extends Component { 

    state = {
        flavors: [] as Flavor[]
    }

    constructor(props: any){ 
        super(props) 
    } 

    componentDidMount() {
        api.get('/api/flavors/').then(res => {
            this.setState({flavors: res.data as Flavor[]})
        })
    }
    

      
    render(){ 
        return (
            <div>
            <div> 
                <FlavorTable flavors={this.state.flavors}/>
            </div>
            </div>
        );
    } 
};