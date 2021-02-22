import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import ReactPaginate from 'react-paginate';
// import SearchBar from './SearchBar';

export default class User extends Component {
  
  state = { users:[] , searchTerm:'',sortType:null,currentPage:0,postPerpage:5,pageNo:1,canNextPage:null}; 
      

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        
        const users = res.data.slice(this.currentPage,this.postPerpage);
        
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

 Back=()=>{
  this.setState({currentPage:this.state.currentPage-2,postPerpage:this.state.postPerpage-2,pageNo:this.state.pageNo-1})
}

  Next=()=>{
    this.setState({currentPage:this.state.currentPage+2,postPerpage:this.state.postPerpage+2,pageNo:this.state.pageNo+1})
    // if(this.state.pageNo===5){
    //   this.setState(this.state.canNextPage=true)
    // }
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
         filteredUsers=this.state.users.slice(this.state.currentPage,this.state.postPerpage).filter((user)=>{
          return user.name.toLowerCase().includes(this.state.searchTerm.toLocaleLowerCase())
        })
        return (
          <div>
            <NavLink to="/" style={{padding:'20px'}}>Home-Page</NavLink> 
            
            <div style={{display:"flex"},{margin:"30px"}}> <SearchBar style={{margin:"20px"}} handleChange={(e)=>this.setState({searchTerm:e.target.value})}/>  
         
          <button onClick={()=>this.onSort('asc')}  >Sort By Asc</button>
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
                  ))} </tbody>
             
             </table>
             <div style={{margin:"30px"}}>
                 <button onClick={()=>this.Next() } disabled={this.state.canNextPage} disabled={this.state.pageNo == 5} >Next..</button>
                 <p>Page no:{this.state.pageNo}</p>
                 <button onClick={()=>this.Back()  } disabled={this.state.pageNo == 1}  >..Back</button>
                 </div>
             <table style={ {padding:'20px'}}><NavLink  to="/users/new">New-user</NavLink> </table>   
          </div>
        )
      }
    

    }