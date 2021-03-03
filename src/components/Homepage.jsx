import React, { Component } from 'react';
// import {NavLink} from 'react-router-dom';
// import User from './User';

const em="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
// import "public/GlobalVariable.jsx";
export default class Homepage extends Component {

  userData;
  constructor()
  {
    super();
    this.textInput=React.createRef();
   
    this.state=
    {
      email:"",
      password:"",
      nameError:"",
      passwordError:""
    }
  }

  componentDidMount=()=>{
    this.textInput.current.focus();
  }
  
  //  **setting up local storage**

//   componentDidMount() {
//     this.userData = JSON.parse(localStorage.getItem('user'));

//     if (localStorage.getItem('user')) {
//         this.setState({
//             email: this.userData.email,
//             password: this.userData.password,
//         })
//     } else {
//         this.setState({
//             email: '',
//             password: ''
//         })
//     }
// }

// componentWillUpdate(nextProps, nextState) {
//     localStorage.setItem('user', JSON.stringify(nextState));
// }

  valid()
  {
    if(this.state.email!==global.name && !this.state.email.match(em) && this.state.password!==global.userPassword)
    {
      this.setState({nameError:"Invalid Email",passwordError: "Invalid Password"})
    }
    else if(!this.state.email.match(em) && this.state.email!==global.name)
    {
     this.setState({nameError:"Invalid Email",passwordError:""})
    }
    else if(this.state.password!==global.userPassword)
    {
      this.setState({passwordError:"Invalid Password",nameError:""}) 
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
        localStorage.setItem("token","dsfnsdlkfnsdjklasad")
        this.props.history.push(`/users/`);
      }
    }

  render() 
  { 
    //   console.log(window.user)
    return (
    
      <div style={{padding:"50px"}}>
      <h1>Sign In</h1>   
      <label>Username</label><br/>
      <input type="text" ref={this.textInput} onChange={(event)=>{this.setState({email:event.target.value})}}/>
      <p style={{color:"red" ,fontSize:"14px"}}>{this.state.nameError}</p>

      <label>Password</label><br/>
      <input type="password"  onChange={(event)=>{this.setState({password:event.target.value})}}/>
      <p style={{color:"red" ,fontSize:"14px"}}>{this.state.passwordError}</p>
      <button onClick={()=>this.submit()}>Login</button>
                
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
