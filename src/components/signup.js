import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'

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
    if(this.state.error===false) return <Redirect to='/home'/>
    var styles = {
        backgroundColor: "#4B4B4B",
        paddingLeft: "2em",
        border: "1px solid #4B4B4B",
        color: "white"
    }
    return(
      <div className='container'>
      <div className='center-align'>
      <h1 className='title'>New to Mosaic?</h1>
      <p className='text'>Signup and take the first step toward tracking your mental health</p>
      </div>
        <form className= 'form'onSubmit={this.handleSubmit}>
          <input className='inputs' style={styles} type='text' ref='fname' placeholder='first name'></input>
          <input className='inputs' style={styles} type='text' ref='lname' placeholder='last name'></input>
          <input className='inputs' style={styles} type='text' ref='email' placeholder='email'></input>
          <input className='inputs' style={styles} type='password' ref='password' placeholder='password'></input>
          <div className='center-align'>
          <input className='button' type='submit'></input>
          </div>
        </form>
        <div className='center-align'>
        <p className='subtitle2'><Link to='/login'>Already have an account?</Link></p>
        </div>
        {this.state.error ? <h1>{this.state.error}</h1> : null}
      </div>
    )
  }
}
