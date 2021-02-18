import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import UserInput from './UserInput';

// const api = axios.create({
//     baseURL: `https://jsonplaceholder.typicode.com/users`
// })

export default class User extends Component {


    state = {
        users: []
      }
      
      componentDidMount() {
          
        axios.get(`https://jsonplaceholder.typicode.com/users`)
          .then(res => {
            const users = res.data;
            this.setState({ users });
          })
      }

      
      deleteRow(id){
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
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
          console.log("render");
        return (
          <div>
              <NavLink to="/" style={{padding:'20px'}}>Home-Page</NavLink>
            <h1>User-List </h1>
      
            <table className="table table-bordered">
                <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Action</th>
                      <th>Details</th>
                  </tr>
                </thead>
      
                <tbody>
                  {this.state.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      
                      <td>
                        <button className="btn btn-danger" onClick={() => this.deleteRow(user.id)}>Delete</button>
                      </td>
                      <td>
                      <NavLink to={{  pathname:'/users/<the-user-id>',  state: {name:'from home page'}  }}>User Detail</NavLink>
                      {/* <NavLink to={"/users/<the-user-id>" , {ids:user.id}}  style={{padding:'20px'}}>Details</NavLink> */}
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={(e) => this.getData(user.id-1, e)}>Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                
            </table><table style={ {padding:'20px'}}><NavLink  to="/users/new">New-user</NavLink>
            </table>          </div>
        )
      }
    


//     state = {
//         persons:[],
//     }


//     // For user Detail with the help of onClick listner
    // getData=(id)=>{
            
    //         console.log(id)
    //         api.get('/').then(res=>{
    //             console.log(res.data[id]);
    //         })
    // }
 
//     // postDeleted (){
//     //   alert("are you sure about this")
//     //     // if(window.confirm("Are you sure about")) {
//     //     //     api.delete('https://jsonplaceholder.typicode.com/users/${id}')
//     //     // }   api.get('/').then(res=>{
//     //     //     console.log(res.data[id]); console.log(res.data)
//     //     // })   
       
//     // };

//     deleteData=(id)=>{
       
//         if(window.confirm("Are you sure about")) {
//             axios.delete('https://jsonplaceholder.typicode.com/users/${id}').then(res=>{
//                 console.log(res);
//                 console.log(res.data);
//                 const persons = this.state.persons.filter(person => person.id !== id);
//                 this.setState({ persons });
        
//             })
//             // console.log("your id id :" +id+this.getData())
//     }}

//     componentDidMount(){
//         api.get('/').then(res=>{
//             console.log(res.data);
//             this.setState({
//                 persons:res.data
//             });
//         });}

//     render() {
//        return (
//            <> 
               
//             <div style={{padding:'40px'}}>
//                 <h1>User Page</h1> 
//                 <NavLink to="/" style={{padding:'20px'}}>Home-Page</NavLink>

//                 <NavLink to="/users/new">New-user</NavLink>
//                 <ul >
//                 {this.state.persons.map(person => <li key={person.name}   ><button onClick={()=>this.getData(person.id-1)} >{person.name}</button>
//                 <button onClick={()=>this.deleteData(person.id-1)} >Delete</button>
                  
//                 </li>)}
//                 </ul>
//             </div>
//             <NavLink to="/users/new">New-user</NavLink>
//         </>)
    }
// }
