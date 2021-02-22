import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios';

// Created api constant outside the class
const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/users`
})


export default class UserInput extends Component {
    state = {users:[]}; 
    

    componentDidMount() {
        const loc=window.location.href;
        var resu=loc.split("/");
        var id = resu[4];
       
        axios.get(`https://jsonplaceholder.typicode.com/users/`)
        .then(res => {
          console.log(res.data[id])
          const users = res.data[id-1];
          this.setState({ users });
          })
        }

    handleChange = event =>{ this.setState( { [event.target.name] :event.target.value, }, ) }
    
    handleSubmit= event =>{
      const loc=window.location.href;  // cathing id of user using url
      var resu=loc.split("/");
      var id = resu[4];
      event.preventDefault();   
        const user =
          { name:this.state.name,
            username:this.state.username,
            email:this.state.email, 
          }
        api.put(`https://jsonplaceholder.typicode.com/users/${id}`,{user}).then(res=>
          {
              const users=res.data;
              this.setState({ users })
            this.props.history.push(`/users/`);
            console.log(res)
            console.log(res.data)
          })};

    render() {
      return (<>
        <NavLink exact to="/users" >USERS</NavLink> 
          <form onSubmit={this.handleSubmit} style={{boxSizing :"border-box"}}> 
            <label>Name:
              <input type="text" name="name" placeholder={this.state.users.name} onChange={this.handleChange}/>
            </label>
            <label>UserName:
              <input type="text" name="username" placeholder={this.state.users.username} onChange={this.handleChange}/>
            </label><br/>
            <label>Email:
              <input type="text" name="email" placeholder={this.state.users.email} onChange={this.handleChange}/>
            </label>
            <button type="submit">Add</button>
        </form> 
          </>)
          }
        }
