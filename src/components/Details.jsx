import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import User from './User';


// const api = axios.create({
//     baseURL: `https://jsonplaceholder.typicode.com/users`
// })

export default class Details extends Component {


    state = {
        users: []
      }
      
      componentDidMount() {
          
        axios.get(`https://jsonplaceholder.typicode.com/users/`)
          .then(res => {
              console.log(res.data[0])
            const users = res.data;
            this.setState({ users });
            
          })
      }

      
      deleteRow(id){
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then(res => {
            console.log(res);
            console.log(res.data);

            // Filter works similarly as if else

            const users = this.state.users.filter(item => item.id !== id);
            this.setState({ users });
          })
       }
      
           getData=(id)=>{
            
            console.log(id)
            axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
                console.log(res.data[id]);
            })
    }


      render() {
         
          
        return (
          <div>
              <NavLink to="/" style={{padding:'20px'}}>Home-Page</NavLink>
            <h1>User-List </h1>
      
            <table className="table table-bordered">
                <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                     
                  </tr>
                </thead>
      
                <tbody>
                  {this.state.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>  
                    </tr>
                  ))}
                </tbody>
                
            </table>        </div>
        )
      }
    }