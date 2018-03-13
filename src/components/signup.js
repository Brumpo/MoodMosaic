import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

export default class Signup extends Component{
  constructor(props) {
    super(props)
    this.state={
      error:''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e){
   e.preventDefault()
   const route = 'create_user'
   const method = 'POST'
   let body = {
     fname:this.refs.fname.value,
     lname:this.refs.lname.value,
     email:this.refs.email.value,
     password: this.refs.password.value
   }
   let {error} = await this.props.fetchNewState(method,body,route)
   console.log(error)
   this.setState({error})
  }

  render(){
    if(this.state.error===false) return <Redirect to='/login'/>
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' ref='fname' placeholder='first name'></input>
          <input type='text' ref='lname' placeholder='last name'></input>
          <input type='text' ref='email' placeholder='email'></input>
          <input type='password' ref='password' placeholder='password'></input>
          <input type='submit'></input>
        </form>
        {this.state.error ? <h1>{this.state.error}</h1> : null}
      </div>
    )
  }
}
