import React, { Component } from 'react'
import axios from "axios"
import ScreenTable from './ScreenTable';
import { Screen } from '../types'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: { }
})

export default class GetScreens extends Component { 

    state = {
        screens: [] as Screen[]
    }

    constructor(props: any){ 
        super(props) 
    } 

    componentDidMount() {
        api.get('/api/screens/').then(res => {
            this.setState({screens: res.data as Screen[]})
        })
    }
    

      
    render(){ 
        return (
            <div>
            <div> 
                <ScreenTable screens={this.state.screens}/>
            </div>
            </div>
        );
    } 
};