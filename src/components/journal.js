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
    var col = this.props.expanded ? '8' : '11'
    console.log('renderjournal', this.props);
    return(
      <div className={`col s${col}`}>
      <div className='container'>
      <div className='center-align'>
        <h1 className='title'>{date}</h1>
        </div>
        <div className='center-align'>
        <h2 className='subtitle'>At a Glance</h2>
        </div>
        <ul>
          <li className='subtitle2'>{this.props.journal.x1.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x1.split(',')[1]}</span></li>
          <li className='subtitle2'>{this.props.journal.x2.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x2.split(',')[1]}</span></li>
          <li className='subtitle2'>{this.props.journal.x3.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x3.split(',')[1]}</span></li>
          <li className='subtitle2'>{this.props.journal.x4.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x4.split(',')[1]}</span></li>
          <li className='subtitle2'>{this.props.journal.x5.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x5.split(',')[1]}</span></li>
          <li className='subtitle2'>{this.props.journal.x6.split(',')[0] + ': '}<span className ='text'>{this.props.journal.x6.split(',')[1]}</span></li>
        </ul>
        <div className='center-align'>
        <h2 className='subtitle'>Summary</h2>
        </div>
        <p className='text'>{this.props.journal.summary}</p>
        <div className='center-align'>
        <h2 className='subtitle'>Journal</h2>
        </div>
        <p className='text'>{this.props.journal.journal}</p>
        <div className='row container'>
        <div className='center-align' style={{ marginTop: '7em'}}>
        <Link className='button' to='/mosaic' style={{marginLeft: '15em'}}>Back</Link>
        <Link className='button' to='/mosaic' style={{marginLeft: '4em'}}>Edit</Link>
        </div>
        </div>
      </div>
      </div>
    )
  }
}
