import React, { Component } from 'react'
import axios from "axios"
import LocationTable from './LocationsTable';
import { Location } from '../types'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: { }
})

export default class GetLocations extends Component { 

    state = {
        locations: [] as Location[]
    }

    constructor(props: any){ 
        super(props) 
    } 

    componentDidMount() {
        api.get('/api/locations/').then(res => {
            this.setState({locations: res.data as Location[]})
        })
    }
    

      
    render(){ 
        return (
            <div>
            <div> 
                <LocationTable locations={this.state.locations}/>
            </div>
            </div>
        );
    } 
};