import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom'
import {setUp, yeartodate} from '../dateProto.js'


export default class Journal extends Component{
  constructor(props) {
    super(props)
  }
  render(){
    console.log('renderjournal', this.props);
    setUp()
    return(
      <div>
        <h1>{yeartodate(this.props.journal.day, this.props.journal.day).toString()}</h1>
        <p>{this.props.journal.journal}</p>
      </div>
    )
  }
}
