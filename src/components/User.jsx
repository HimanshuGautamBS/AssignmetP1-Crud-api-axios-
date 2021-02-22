import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
// import SearchBar from './SearchBar';

export default class User extends Component {
  
  state = { users:[] , searchTerm:'',sortType:''}; 
      
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users }); })}

  deleteRow(id){
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => {
      // Filter works similarly as if else
      const users = this.state.users.filter(item => item.id !== id);
      this.setState({ users });})}

      
  getData=(id)=>{
    
    axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
      console.log(res.data[id]);
      } )
   }


  editUser=(id)=>{
    this.props.history.push(`/users/${id}/edit`);
  }
onSort=(type)=>{
  this.setState({sortType:type});
}

      render() {
        let sortedUsers;
        if (this.state.sortType === "asc") {
         
          sortedUsers = this.state.users.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
        } else {
          sortedUsers = this.state.users.sort((a, b) =>
            a.name < b.name ? 1 : -1
          );
        }
        let filteredUsers =sortedUsers;
        // filter for searchBar
         filteredUsers=this.state.users.filter((user)=>{
          return user.name.toLowerCase().includes(this.state.searchTerm.toLocaleLowerCase())
        })
        return (
          <div>
            <NavLink to="/" style={{padding:'20px'}}>Home-Page</NavLink> 
            
            <div style={{display:"flex"},{margin:"30px"}}> <SearchBar style={{margin:"20px"}} handleChange={(e)=>this.setState({searchTerm:e.target.value})}/>  
         
          <button onClick={()=>this.onSort('asc')}>Sort By Asc</button>
          <button onClick={()=>this.onSort('desc')}>Sort By Desc</button>
          </div>

            <h1 style={{margin:"30px"}}>User-List </h1>
            <table style={{margin:"30px"}} className="table table-bordered">
              <thead>
                <tr >
                  <th style={{margin:"50px"}}>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                  <th >Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td> <button className="btn btn-danger" onClick={() => this.deleteRow(user.id)}>Delete </button> </td>
                    <td> <NavLink to={{  pathname:`/users/${user.id}`  }}>User Detail</NavLink> </td>
                <button onClick={()=>this.editUser(user.id)}> Edit </button>
                  </tr>
                  ))}
                 
              </tbody>
             </table><table style={ {padding:'20px'}}><NavLink  to="/users/new">New-user</NavLink> </table>   
          </div>
        )
      }
    

    }