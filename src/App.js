import React, { Component } from 'react'
import Login from './components/login.js'
import Signup from './components/signup.js'
import Landing from './components/landing.js'
import Nav from './components/nav.js'
import Home from './components/home.js'
import Mosaic from './components/mosaic.js'
import AddJournal from './components/addJournal.js'
import Journal from './components/journal.js'
import About from './components/about.js'
import ChangeAtaGlance from './components/changeAtaGlance.js'
import { BrowserRouter, Link, Route} from 'react-router-dom'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeTile:{},
      user:{
        token: '',
        id: 1
      },
      atAGlance:[
        'anxiety',
        'irritablity',
        'happiness',
        'sleep',
        'diet',
        'social'
      ]
    }
    this.fetchNewState = this.fetchNewState.bind(this)
    this.hoist = this.hoist.bind(this)
    this.getUser = this.getUser.bind(this)
    this.fetchNewAaG = this.fetchNewAaG.bind(this)
  }

  hoist(state){
      this.setState({
        activeTile: state
      })
  }

  async getUser(){
    var atAGlance = []
    var response = await fetch(`http://localhost:4200/api/user/?uuid=${this.state.user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization' : `${this.state.user.token}`
      },
    })
    var json = await response.json()
    if(json.message) return false
    json = json.data
    delete json.email
    delete json.fname
    delete json.lname
    delete json.password
    console.log(json)
    for (let key in json){
      atAGlance.push(json[key])
    }
    this.setState({atAGlance})
    return true
  }

  async fetchNewAaG(method, body, route){
    body.userId = 1
    body = JSON.stringify(body)
    var response = await fetch(`http://localhost:4200/api/${route}`,{
      method:method,
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization' : `${this.state.user.token}`
      },
      body: body
    })
    var json = await response.json()
    if(json.message) return {error: json.message}
    //{error: 'At a Glance failed to update, please try again'}
    var atAGlance = []
    for (let key in json){
      atAGlance.push(json[key])
    }
    this.setState({atAGlance})
    return {error:false}
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
    this.setState({
      user:{
        token:json.token,
        id: json.id
      }
    })
    var result = this.getUser() ? {error: false} : {error: 'something went wrong with Authorization, please try login/signup again'}
    return result
  }
  render() {
    console.log('app', this.state)
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
            <Mosaic userId={this.state.user.id} hoist={this.hoist} keys={this.state.atAGlance}/>
          )}/>
          <Route exact path='/addjournal' render={()=>(
            <AddJournal fetchNewState = {this.fetchNewState}/>
          )}/>
          <Route path='/journal' render={()=>(
            <Journal journal = {this.state.activeTile} keys={this.state.atAGlance}/>
          )}/>
          <Route exact path='/about' render={()=>(
            <About/>
          )}/>
          <Route exact path='/AtaGlance/edit' render={()=>(
            <ChangeAtaGlance fetchNewAaG={this.fetchNewAaG}/>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
