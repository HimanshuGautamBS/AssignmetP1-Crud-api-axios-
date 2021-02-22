import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const api = axios.create( { baseURL:`https://jsonplaceholder.typicode.com/users` } )

export default class UserInput extends Component {
  state = { users:[] }; 
 
    // anything we type inside the text box get added to the state
    handleChange = event =>{
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
      this.setState( { [event.target.name]:event.target.value, },) }                                                       
    // {username:event.target.value}
    // ,{email:event.target.value},
    
    //and then we submit with the help of add button
    handleSubmit= event =>{
      event.preventDefault();   
        // stoping the browser from reloding the page
      const user =
        {
          name:'',
          username:'',
          email:''
        }
       api.post('/',{user}).then(res=>
            { 
            //      if(res.status === 201){
            //        window.location.href = "/users"
            //    }
               console.log(res.data)
               this.props.history.push(`/users/`);
            })
    };

    render() {
      return (<>
        <NavLink exact to="/users" >USERS</NavLink> 
          <form onSubmit={this.handleSubmit} style={{boxSizing :"border-box"}}> 
            <label>Name:
              <input type="text" name="name" onChange={this.handleChange}/>
            </label>
            <label>UserName:
              <input type="text" name="username" onChange={this.handleChange}/>
            </label><br/>
            <label>Email:
              <input type="text" name="email" onChange={this.handleChange}/>
            </label>
            <button type="submit">Add</button>
          </form> 
        </>  )
      }
    }
