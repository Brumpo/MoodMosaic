import React, { Component } from 'react';
import Login from './components/login.js'
import Signup from './components/signup.js'
import Landing from './components/landing.js'
import Nav from './components/nav.js'
import Home from './components/home.js'
import Mosaic from './components/mosaic.js'
import AddJournal from './components/addJournal.js'
import Journal from './components/journal.js'
import About from './components/about.js'
import { BrowserRouter, Link, Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeTile:{},
      user:{
        token: '',
        id: 1
      }
    }
    this.fetchNewState = this.fetchNewState.bind(this)
    this.hoist = this.hoist.bind(this)
  }

  hoist(state){
    this.setState({
      activeTile: state
    })
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
    if(!json) return {error: 'something went worng please try again'}
    if(json.error) return {error: 'incorrect user name or password'}
    if(json.message) return {error: json.message}
    console.log(json)
    this.setState({
      user:{
        token:json.token,
        id: json.id
      }
    })
    return {error: false}
  }
  render() {
    console.log('app', this.state);
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
          <Route path='/home' render={()=>(
            <Home/>
          )}/>
          <Route path='/mosaic' render={()=>(
            <Mosaic userId={this.state.user.id} hoist={this.hoist}/>
          )}/>
          <Route exact path='/addjournal' render={()=>(
            <AddJournal fetchNewState = {this.fetchNewState}/>
          )}/>
          <Route path='/journal' render={()=>(
            <Journal journal = {this.state.activeTile}/>
          )}/>
          <Route exact path='/about' render={()=>(
            <About/>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
