import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom';
import {setUp, yeartodate} from '../dateProto.js'

export default class AtAGlance extends Component {
  constructor(props) {
    super(props)
    this.serialize = this.serialize.bind(this)
  }

  serialize(){
    let date = yeartodate(this.props.atAGlance.day, this.props.atAGlance.year).toString().split(' ')
    let dayname = date[0]
    let month = date[1]
    let daynumber = date[2]
    let year = date[3]
    return `${dayname}, ${month} ${daynumber} ${year}`
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
          <h5 className='subtitle'>{this.serialize()}</h5>
          <p className='text'>{this.props.atAGlance.undef}</p>
        </div>
      )
    }else{
      return(
        <div className='AaG'>
          <h1 className='title'>At A Glance</h1>
          <h5 className='subtitle'>{this.serialize()}</h5>
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
