import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom';

export default class Scroll extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(filter){
    switch (filter) {
      case 'week':
        break;
      case 'month':
        break;
      case 'year':
        break;
      case 'back':
        break;
      case 'forward':
        break;
      default:

    }
  }

  render(){
    return(
      <div>
        <span onClick={(e)=>{this.onClick('back')}}>{'<< '}</span>
        <span onClick={(e)=>{this.onClick('week')}}>week | </span>
        <span onClick={(e)=>{this.onClick('month')}}>month | </span>
        <span onClick={(e)=>{this.props.onClick('year')}}>year </span>
        <span onClick={(e)=>{this.onClick('forward')}}>{'>>'}</span>
      </div>
    )
  }
}
