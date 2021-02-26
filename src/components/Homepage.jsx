import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import User from './User';

// import "public/GlobalVariable.jsx";
export default class Homepage extends Component {

  constructor()
  {
    super();
    this.state=
    { intialname:"himanshu",
      email:"",
      password:"",
      nameError:"",
      passwordError:""
    }
  }

  valid()
  {
    if(this.state.email!==global.name && this.state.password!==global.userPassword)
    {
      this.setState({nameError:"Invalid Email",passwordError: "Password lenth should be more than 5"})
    }
    else if(this.state.email!==global.name)
    {
     this.setState({nameError:"Invalid Email"})
    }
    else if(this.state.password!==global.userPassword)
    {
      this.setState({passwordError:"Password length should be grater than 5"}) 
    }
    else
    {
      return true;
    }
  }


  submit()
    {
      if(this.valid())
      {
        this.props.history.push(`/users/`);
        
        alert(this.name)
      }
    }

  render() 
{ 
    return (
    
      <div style={{padding:"50px"}}>
   <h1> ({global.name})   </h1>    
      <label>Email</label><br/>
      <input type="text" onChange={(event)=>{this.setState({email:event.target.value})}}/>
      <p style={{color:"red" ,fontSize:"14px"}}>{this.state.nameError}</p>

      <label>Password</label><br/>
      <input type="password" onChange={(event)=>{this.setState({password:event.target.value})}}/>
      <p style={{color:"red" ,fontSize:"14px"}}>{this.state.passwordError}</p>
      <button onClick={()=>this.submit()}>Submit</button>
                
      </div>
        )
    }
}


// import React, { Component } from 'react';
// import {NavLink} from 'react-router-dom';
// // import User from './User';
// export default class Homepage extends Component {
//     render() {
//         return (
//             <div>
//               <h1>This is Homepage</h1>
//               <NavLink exact to="/users" >USERS</NavLink> 
//             </div>
//         )
//     }
// }
