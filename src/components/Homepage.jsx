import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
// import User from './User';
export default class Homepage extends Component {
    render() {
        return (
            <div>
              <h1>This is Homepage</h1>
              <NavLink exact to="/users" >USERS</NavLink> 
            </div>
        )
    }
}
