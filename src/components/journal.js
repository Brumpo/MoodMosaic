import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

export default class Journal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error:''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e){
    e.preventDefault()
    const route = 'create_date'
    const method = 'POST'
    let body = {
      userId: this.refs.uuid.value,
      day: this.refs.day.value,
      year: this.refs.year.value,
      atAGlance: this.refs.atAGlance.value,
      journal: this.refs.journal.value
    }
    let {error} = await this.props.fetchNewState(method,body,route)
    this.setState({error})
  }

  render(){
    if(this.state.error===false) return <Redirect to='/login'/>
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' ref='uuid' placeholder='uuid'></input>
          <input type='text' ref='day' placeholder='day'></input>
          <input type='text' ref='year' placeholder='year'></input>
          <input type='text' ref='atAGlance' placeholder='atAGlance'></input>
          <input type='text' ref='journal' placeholder='journal'></input>
          <input type='submit'></input>
        </form>
        {this.state.error ? <h1>{this.state.error}</h1> : null}
      </div>
    )
  }
}
