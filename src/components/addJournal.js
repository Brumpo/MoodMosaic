import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {setUp, yeartodate} from '../dateProto.js'

export default class AddJournal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error:''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.serialize = this.serialize.bind(this)
  }

  async handleSubmit(e){
    e.preventDefault()
    setUp()
    const route = 'create_date'
    const method = 'POST'
    console.log(this.props)
    let body = {
      userId: this.props.uuid,
      day: this.props.journal.day,
      year: this.props.journal.year,
      x1: `${this.props.keys[0]},${this.refs.x1.value}`,
      x2: `${this.props.keys[1]},${this.refs.x2.value}`,
      x3: `${this.props.keys[2]},${this.refs.x3.value}`,
      x4: `${this.props.keys[3]},${this.refs.x4.value}`,
      x5: `${this.props.keys[4]},${this.refs.x5.value}`,
      x6: `${this.props.keys[5]},${this.refs.x6.value}`,
      summary: this.refs.summary.value,
      journal: this.refs.journal.value
    }
    var date = yeartodate(this.props.journal.day, this.props.journal.year)
    var start = date.getFOM()
    var end = date.getLOM()
    console.log(start, end)
    this.props.dateCallback(start,end,this.props.journal.year)
    let {error} = await this.props.fetchNewState(method,body,route)
    this.setState({error})
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
    if(this.state.error===false) return <Redirect to='/mosaic'/>
    return(
      <div className='container'>
        <div className='center-align'>
          <h1 className='title'>{this.serialize()}</h1>
          <form onSubmit={this.handleSubmit}>
            <input id='inputs' type='text' ref='x1' placeholder={`${this.props.keys[0]} (1-10 used in calculating color)`}></input>
            <input id='inputs' type='text' ref='x2' placeholder={`${this.props.keys[1]} (1-10 used in calculating color)`}></input>
            <input id='inputs' type='text' ref='x3' placeholder={`${this.props.keys[2]} (1-10 used in calculating color)`}></input>
            <input id='inputs' type='text' ref='x4' placeholder={`${this.props.keys[3]}`}></input>
            <input id='inputs' type='text' ref='x5' placeholder={`${this.props.keys[4]}`}></input>
            <input id='inputs' type='text' ref='x6' placeholder={`${this.props.keys[5]}`}></input>
            <input id='input-med' type='text' ref='summary' placeholder='summary'></input>
            <input id='input-lrg' type='text' ref='journal' placeholder='journal'></input>
            <input className='button' type='submit'></input>
          </form>
          {this.state.error ? <h1 className='title'>{this.state.error}</h1> : null}
        </div>
      </div>
    )
  }
}
