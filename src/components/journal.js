import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom'
import {setUp, yeartodate} from '../dateProto.js'


export default class Journal extends Component{
  constructor(props) {
    super(props)
    this.serialize = this.serialize.bind(this)
  }

  serialize(){
    let date = yeartodate(this.props.journal.day, this.props.journal.year).toString().split(' ')
    let dayname = date[0]
    let month = date[1]
    let daynumber = date[2]
    let year = date[3]
    return `${dayname}, ${month} ${daynumber} ${year}`
  }

  render(){
    setUp()
    var date = this.serialize()
    console.log('renderjournal', this.props);
    return(
      <div>
        <h1 className='title'>{date}</h1>
        <h2 className='subtitle'>At a Glance</h2>
        <ul>
          <li className='subtitle2'>{this.props.journal.x1.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x1.split(',')[1]}</span></li>
          <li className='subtitle2'>{this.props.journal.x2.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x2.split(',')[1]}</span></li>
          <li className='subtitle2'>{this.props.journal.x3.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x3.split(',')[1]}</span></li>
          <li className='subtitle2'>{this.props.journal.x4.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x4.split(',')[1]}</span></li>
          <li className='subtitle2'>{this.props.journal.x5.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x5.split(',')[1]}</span></li>
          <li className='subtitle2'>{this.props.journal.x6.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x6.split(',')[1]}</span></li>
        </ul>
        <h2 className='subtitle'>Summary</h2>
        <p className='text'>{this.props.journal.summary}</p>
        <h2 className='subtitle'>Journal</h2>
        <p className='text'>{this.props.journal.journal}</p>
      </div>
    )
  }
}
