import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/users`
})

export default class UserInput extends Component {
    state = {
        name:'',
    }; 
 
    // anything we type inside the text box get added to the state

    handleChange = event =>{
        this.setState({name:event.target.value})
    }
    
    // and then we submit with the help of add button

    handleSubmit= event =>{
        event.preventDefault();   
        // stoping the browser from reloding the page
        const user ={
            name:this.state.name
        }
         api.post('/',{user}).then(res=>
            {
                if(res.status === 201){
                    window.location.href = "/users"
                }
                console.log(res)
                console.log(res.data)
            })
    };



    render() {
       return (<>
       <NavLink exact to="/users" >USERS</NavLink> 
           <form onSubmit={this.handleSubmit}> 
            <label>User Name:
                <input type="text" name="name" onChange={this.handleChange}/>
            </label>
            <button type="submit">Add</button>
        </form> 
        </>)
      
    }
}
