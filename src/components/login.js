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
    if(this.state.error===false) return <Redirect to='/mosaic'/>
    return(
      <div>
      <div className='col s5'>
      </div>
      <div className='col s2'>
      <div className='container center-align'>
      <h1 className= 'title'>Welcome Back</h1>
        <form className= 'form'onSubmit={this.handleSubmit}>
          <input id='inputs' type='text' ref='email' placeholder='email'></input>
          <input id='inputs' type='password' ref='password' placeholder='password'></input>
          <div className='center-align'>
          <input className='button' type='submit'></input>
          </div>
        </form>
        {this.state.error ?
          <h1>{this.state.error}</h1>
        :null}
      </div>
      </div>
      <div className='col s5'>
      </div>
      </div>
    )
  }

}
