import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom'

export default class Landing extends Component {
  render(){
    return(
      <div>
        <h1>Alone Again or...</h1>
        <h2>Personal Mood Journal</h2>
        <Link to='/Signup'>Continue</Link>
      </div>
    )
  }
}
