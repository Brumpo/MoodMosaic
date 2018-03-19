import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom';

export default class AtAGlance extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    console.log(this.props.atAGlance)
    if(this.props.atAGlance.default){
      return(
        <div className='AaG'>
          <h1 className='title'>At A Glance</h1>
          <p className='text'>{this.props.atAGlance.default}</p>
        </div>
      )
    }else if (this.props.atAGlance.undef) {
      return(
        <div className='AaG'>
          <h1 className='title'>At A Glance</h1>
          <p className='text'>{this.props.atAGlance.undef}</p>
        </div>
      )
    }else{
      return(
        <div className='AaG'>
          <h1 className='title'>At A Glance</h1>
          <ul className='text'>
            <li>{this.props.atAGlance.x1.split(',')[0] + ':'}<span>{' ' + this.props.atAGlance.x1.split(',')[1]}</span></li>
            <li>{this.props.atAGlance.x2.split(',')[0] + ':'}<span>{' ' + this.props.atAGlance.x2.split(',')[1]}</span></li>
            <li>{this.props.atAGlance.x3.split(',')[0] + ':'}<span>{' ' + this.props.atAGlance.x3.split(',')[1]}</span></li>
            <li>{this.props.atAGlance.x4.split(',')[0] + ':'}<span>{' ' + this.props.atAGlance.x4.split(',')[1]}</span></li>
            <li>{this.props.atAGlance.x5.split(',')[0] + ':'}<span>{' ' + this.props.atAGlance.x5.split(',')[1]}</span></li>
            <li>{this.props.atAGlance.x6.split(',')[0] + ':'}<span>{' ' + this.props.atAGlance.x6.split(',')[1]}</span></li>
            <li>Summary: <span>{this.props.atAGlance.summary}</span></li>
          </ul>
        </div>
      )
    }
  }
}
