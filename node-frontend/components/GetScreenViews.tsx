import React, { Component } from 'react'
import axios from "axios"
import ScreenViewTable from './ScreenViewTable';
import { ScreenView } from '../types'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: { }
})

export default class GetScreenViews extends Component { 

    state = {
        screen_views: [] as ScreenView[]
    }

    constructor(props: any){ 
        super(props) 
    } 

    componentDidMount() {
        api.get('/api/screen_views/').then(res => {
            this.setState({screen_views: res.data as ScreenView[]})
        })
    }
    

      
    render(){ 
        return (
            <div>
            <div> 
                <ScreenViewTable screen_views={this.state.screen_views}/>
            </div>
            </div>
        );
    } 
};