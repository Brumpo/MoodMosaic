import React, { Component } from 'react';
import {Link, Redirect, Switch, Route} from 'react-router-dom';

export default class About extends Component {
  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
    this.displaySwitch = this.displaySwitch.bind(this)
    this.state = {
      filter: 'default'
    }
  }
  onClick(filter){
    this.setState({
      filter
    })
  }
  displaySwitch(){
    switch (this.state.filter) {
      case 'Creator':
       return <p>shit about me</p>
      case 'Inspiration':
        return <p>shit about this</p>
      case 'ref':
        return <p>shit about more shit</p>
      default:
        return <p>click on shit for shit</p>
    }
  }
  render(){
    return(
      <div className='col s8'>
      <div className='container'>
        <h1 className='title'>About</h1>
        <div className='text'>
          <h2 onClick={(e)=>{this.onClick('Creator')}}>Creator</h2>
          <h2 onClick={(e)=>{this.onClick('Inspiration')}}>Inspiration</h2>
          <h2 onClick={(e)=>{this.onClick('ref')}}>References/Additional Info</h2>
        </div>
        <div>
        {this.displaySwitch()}
        </div>
        </div>
      </div>
    )
  }
}
