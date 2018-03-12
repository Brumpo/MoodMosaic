import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom'

export default class Landing extends Component {
  render(){
    return(
      <div>
        <h1 className='title'>Mood Mosaic</h1>
        <h2 className='text'>Personal Mood Journal</h2>
        <Link to='/Signup' id='button' className='waves-effect waves-light btn'>Continue</Link>
      </div>
    )
  }
}
