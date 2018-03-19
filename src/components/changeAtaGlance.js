import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
export default class ChangeAtaGlance extends Component {
  constructor(props) {
      super(props)
      this.state = {
        error: ''
      }
      this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(e){
    e.preventDefault()
    var body = {
      key1: this.refs.core1.value,
      key2: this.refs.core2.value,
      key3: this.refs.core3.value,
      key4: this.refs.support1.value,
      key5: this.refs.support2.value,
      key6: this.refs.support3.value,
    }
    var method = 'PATCH'
    var route = 'user/aag'
    var result = await this.props.fetchNewAaG(method, body, route)
    this.setState({
      error: result.error
    })
  }

  render(){
    console.log(this.state.error)
    if(this.state.error===false) return <Redirect to='/mosaic'/>
    return(
      <div className = 'container'>
      <div className='center-align'>
      <h1 className='title'>Edit your at a glance attributes</h1>
      <h5 id='pad-bot' className='text'>you were previously tracking {
        this.props.keys[0]}, {this.props.keys[1]}, {this.props.keys[2]}, {this.props.keys[3]}, {
        this.props.keys[4]}, and {this.props.keys[5]}</h5>
      </div>
      <form onSubmit={this.onSubmit}>
        <input id='inputs' type='text' ref='core1' placeholder='First primary attribute (used in color scale)'></input>
        <input id='inputs' type='text' ref='core2' placeholder='Second primary attribute (used in color scale)'></input>
        <input id='inputs' type='text' ref='core3' placeholder='Third primary attribute (used in color scale)'></input>
        <input id='inputs' type='text' ref='support1' placeholder='attribute'></input>
        <input id='inputs' type='text' ref='support2' placeholder='attribute'></input>
        <input id='inputs' type='text' ref='support3' placeholder='attribute'></input>
        <div className='center-align'>
        <input className='button' type='submit'></input>
        </div>
      </form>
      </div>
    )
  }
}
