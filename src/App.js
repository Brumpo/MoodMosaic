import React, { Component } from 'react';
import Login from './components/login.js'
import Signup from './components/signup.js'
import Landing from './components/landing.js'
import Nav from './components/nav.js'
import { BrowserRouter, Link, Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:{
        token: '',
        name: ''
      }
    }
    this.fetchNewState = this.fetchNewState.bind(this)
  }
  async fetchNewState(method,body,route){
    body = JSON.stringify(body)
    var response = await fetch(`http://localhost:4200/api/${route}`,{
      method:method,
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*',
      },
      body: body
    })
    var json = await response.json()
    console.log(json)
    if(!json) return {error: 'something went worng please try again'}
    if(json.error) return {error: 'incorrect user name or password'}
    if(json.message) return {error: json.message}
    console.log(json)
    // this.setState({
    //   user:{
    //     token:response.token,
    //     name: response.fname
    //   }
    // })
    return {error: false}
  }
  render() {
    return (
      <BrowserRouter>
      <div>
        <Route exact path='/' render={()=>(
          <Landing/>
        )}/>
        <Route path='/signup' render={()=>(
          <Signup fetchNewState = {this.fetchNewState}/>
        )}/>
        <Route path='/login' render={()=>(
          <Login fetchNewState = {this.fetchNewState}/>
        )}/>
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
