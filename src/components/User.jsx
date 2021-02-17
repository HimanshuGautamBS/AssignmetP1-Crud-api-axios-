import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import UserInput from './UserInput';

const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/users`
})

export default class User extends Component {
    state = {
        persons:[],
    }


    // For user Detail with the help of onClick listner
    getData=(id)=>{
            
            console.log(id)
            api.get('/').then(res=>{
                console.log(res.data[id]);
            })
    }
 

    componentDidMount(){
        api.get('/').then(res=>{
            console.log(res.data);
            this.setState({
                persons:res.data
            });
        });}

    render() {
       return (
           <> 
               
            <div style={{padding:'40px'}}>
                <h1>User Page</h1> 
                <NavLink to="/" style={{padding:'20px'}}>Home-Page</NavLink>

                <NavLink to="/users/new">New-user</NavLink>
                <ul >
                {this.state.persons.map(person => <li key={person.name}   ><button onClick={()=>this.getData(person.id-1)} >{person.name}</button></li>)}
                </ul>
            </div>
            <NavLink to="/users/new">New-user</NavLink>
        </>)
    }
}
