import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
  render(){
    return(
      <div>
        <h1>dont you people have homes</h1>
        <Link to='/mosaic'>Continue</Link>
      </div>
    )
  }
}
