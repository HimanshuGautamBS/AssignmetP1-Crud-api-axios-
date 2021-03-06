import React, { Component } from 'react'
import {NavLink ,Redirect} from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import ReactPaginate from 'react-paginate';
import Datepicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";

export default class User extends Component {
  constructor(props)
  {
    super(props)
    const token = localStorage.getItem("token")
    
    let loggedin=true
    if(token==null) { loggedin=false }  

    this.state = { users:[] , searchTerm:'',sortType:null,currentPage:0,postPerpage:2,pageNo:1 , loggedin ,selectedDate:null}; 
  }
 
      

  componentDidMount() 
  {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => 
      {
      const users = res.data.slice(this.currentPage,this.postPerpage);
      this.setState({ users });
      })
  }

  deleteRow(id){
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => { 
     // Filter works similarly as if else
     const users = this.state.users.filter(item => item.id !== id);
     this.setState({ users });})}

      
  getData=(id)=>
  {
    axios.get('https://jsonplaceholder.typicode.com/users').then(res=>
    {
    console.log(res.data[id]);
    })
  }

  editUser=(id)=>
  {
    this.props.history.push(`/users/${id}/edit`);
  }

  onSort=(type)=>
  {
  this.setState({sortType:type});
  }

  Back=()=>
  {
  this.setState({currentPage:this.state.currentPage-2,postPerpage:this.state.postPerpage-2,pageNo:this.state.pageNo-1})
  }

  Next=()=>
  {
    this.setState({currentPage:this.state.currentPage+2,postPerpage:this.state.postPerpage+2,pageNo:this.state.pageNo+1})
  }
  
  changePage=({selected})=>
  {
    this.setState({pageNo:selected+1})
    this.setState({currentPage:selected,postPerpage:selected+2})
  }
  
  handleChange=()=>
  {
    console.log("clicked");
  }

  render() {
    if(this.state.loggedin===false)
      return <Redirect to="/" />
        
    let sortedUsers;
    if (this.state.sortType === "asc")
     {
       sortedUsers = this.state.users.sort((a, b) =>
         a.name > b.name ? 1 : -1
         );} 
    else {
          sortedUsers = this.state.users.sort((a, b) =>
            a.name < b.name ? 1 : -1
          );}

    let filteredUsers =sortedUsers;
      // filter for searchBar
      filteredUsers=this.state.users.slice(this.state.currentPage,this.state.postPerpage).filter((user)=>
      {
      return user.name.toLowerCase().includes(this.state.searchTerm.toLocaleLowerCase())
      })
  
  return (
    <div style={{margin:"20px"}}>
      <Container>
      <label style={{color:"MenuText"}}>Date-Picker</label>
      <br/>
      <Datepicker
       selected={this.state.selectedDate}
       onChange={(date)=>{this.setState({selectedDate:date})}}
       dateFormat='dd/MM/yyyy'
       isClearable
       showYearDropdown
       scrollableMonthYearDropdown
       />
      <div style={{display:"flex"},{margin:"20px"}}>  
        <SearchBar handleChange={(e)=>this.setState({searchTerm:e.target.value})}/>  
        <Button style={{margin:"20px"}} variant="outline-secondary" onClick={()=>this.onSort('asc')} >Sort By Asc</Button>
        <Button variant="outline-secondary" onClick={()=>this.onSort('desc')}>Sort By Desc</Button>
      </div>
 
      <h1 style={{margin:"20px"}}>User-List </h1>
      <table style={{margin:"20px"}} className="table table-bordered">
        <thead>
          <tr >
            <th style={{margin:"50px"}}>ID</th>
            <th>Name</th>
            <th>Action</th>
            <th >Details</th>
            <th >Edit</th>
          </tr>
        </thead>
      <tbody>  
        {filteredUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td> <Button variant="outline-danger" onClick={() => this.deleteRow(user.id)}>Delete </Button> </td>
            <td> <NavLink to={{  pathname:`/users/${user.id}`  }}>User Detail</NavLink> </td>
        <Button variant="outline-warning" onClick={()=>this.editUser(user.id)}> Edit </Button>
          </tr>))}
      </tbody>
      </table>
      <div style={{margin:"20px"}}>
      <ReactPaginate style={{display:"felx"}}
         previousLabel={"Previous"}
         nextLabel={"Next"}
         pageCount={5}
        //  breakLabel={"..."}
         activePage={this.state.activePage}
         onPageChange={this.changePage}
         onClick={this.handleChange}
         activeClassName={"pagianationActive"}
         marginPagesDisplayed={2}
       />
       </div>
       <div style={{margin:"30px"}}>
          <Button color="primary" onClick={()=>this.Next() } disabled={true} >Next..</Button>
          <p>Page no:{this.state.pageNo}</p>
          <Button color="secondary" onClick={()=>this.Back()  } disabled={true}>..Back</Button>
        </div>
        <table style={ {padding:'20px'}}><NavLink  to="/users/new">New-user</NavLink> </table>   
        </Container> 
        </div>
  )
 } 
}