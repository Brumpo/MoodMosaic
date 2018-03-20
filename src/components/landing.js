import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom'

export default class Landing extends Component {
  render(){
    return(
      <div className='splash'>
      <div className='container'>
        <div className='loaf'>
        </div>
        <h1 id='margin top' className='title'>Mood Mosaic</h1>
        <h2 className='subtitle'>Personal Mood Journal</h2>
        <Link to='/Signup' id='button' className='waves-effect waves-light btn'>Continue</Link>
      </div>
      </div>
    )
  }
}
