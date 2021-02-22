import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios';



// const api = axios.create({
//     baseURL: `https://jsonplaceholder.typicode.com/users`
// })

export default class Details extends Component { 
  state = { users:[] }; 
    componentDidMount() {
      const loc=window.location.href;
      var resu=loc.split("/");
      var id = resu[4];
  
      axios.get(`https://jsonplaceholder.typicode.com/users/`)
      .then(res => {
        const users = res.data[id-1];
        this.setState({ users });
        })
      }

   render() {
     return (
       <div>
         <NavLink to="/" style={{padding:'20px'}}>Home-Page</NavLink>
         <h1>User-Detail</h1>
         <table style={{padding:"50px"}} className="table table-bordered">
           <thead style={{padding:"50px"}}>
             <tr style={{padding:"50px"}}>
               <th>ID</th>
               <th>Name</th>
               <th>Email</th>
             </tr>
           </thead>
           <tbody>          
             <tr key={this.state.users.id}>
               <td style={{padding:"20px"}}>{this.state.users.id}</td>
               <td style={{padding:"20px"}}>{this.state.users.name}</td>
               <td>{this.state.users.email}</td>  
             </tr>
           </tbody>
         </table>  
       </div>
        )
      }
    }