import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class LoggedOut extends Component {
  constructor(props){
    super(props)
    localStorage.removeItem("token")
  }
    render() {
        return (
            <div>
                <h1>You have been LoggedOut</h1>
                <NavLink to="/" >Login Again</NavLink>
            </div>
        )
    }
}
