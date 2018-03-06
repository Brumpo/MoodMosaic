import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class Login extends Component{
  constructor(props) {
    super(props)
    this.state={
      error:''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e){
    e.preventDefault()
    const route = 'get_token'
    const method = 'POST'
    let body = {
      email : this.refs.email.value,
      password : this.refs.password.value
    }
    let {error} = await this.props.fetchNewState(method,body,route)
    this.setState({error})
  }

  render(){
    if(this.state.error===false) return <Redirect to='/home'/>
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' ref='email' placeholder='email'></input>
          <input type='text' ref='password' placeholder='password'></input>
          <input type='submit'></input>
        </form>
        {this.state.error ?
          <h1>{this.state.error}</h1>
        :null}
      </div>
    )
  }

}
