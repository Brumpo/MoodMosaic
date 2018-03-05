import React, { Component } from 'react';

export default class Login extends Component{
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    const route = 'get_token'
    const method = 'POST'
    var body = {
      email : this.refs.email.value,
      password : this.refs.password.value
    }
    this.props.fetchNewState(method,body,route)
  }
  
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type='text' ref='email' placeholder='email'></input>
        <input type='text' ref='password' placeholder='password'></input>
        <input type='submit'></input>
      </form>
    )
  }

}
