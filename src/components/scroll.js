import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom';

export default class Scroll extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div>
        <span>{'<< '}</span>
        <span onClick={(e)=>{this.props.changeFilter('week')}}>week | </span>
        <span onClick={(e)=>{this.props.changeFilter('month')}}>month | </span>
        <span onClick={(e)=>{this.props.changeFilter('year')}}>year </span>
        <span>{'>>'}</span>
      </div>
    )
  }
}
