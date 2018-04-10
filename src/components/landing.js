import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom'

export default class Landing extends Component {
  render(){
    let user = localStorage.getItem('Login') || '/signup'
    return(
      <div className='splash'>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
      <div className='container' style={{position: 'relative', zIndex:4}}>
        <div className='loaf'>
        </div>
        <h1 id='margin top' className='title'>Mood Mosaic</h1>
        <h2 className='subtitle' style={{marginBottom: '1em'}}>Personal Mood Journal</h2>
        <Link to={`${user}`} className='button'>Continue</Link>
      </div>
      </div>
    )
  }
}
