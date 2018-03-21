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
        id: -1
      },
      atAGlance:[
        'Anxiety',
        'Irritablity',
        'Happiness',
        'Sleep',
        'Diet',
        'Professional'
      ],
      start: false,
      end: false,
      year: false,
      nav: false
    }
    this.toggleExpanded = this.toggleExpanded.bind(this)
    this.fetchNewState = this.fetchNewState.bind(this)
    this.hoist = this.hoist.bind(this)
    this.getUser = this.getUser.bind(this)
    this.fetchNewAaG = this.fetchNewAaG.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.dateCallback = this.dateCallback.bind(this)
  }

  hoist(state){
      this.setState({
        activeTile: state
      })
  }

  toggleExpanded(){
    let state = this.state.nav ? false : true
    this.setState({
      nav:state
    })
  }


  componentDidMount(){

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
    body.userId = this.state.user.id
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
    json = json.data
    console.log('json', json)
    var atAGlance = []
    for (let key in json){
      atAGlance.push(json[key])
    }
    console.log(atAGlance)
    this.setState({
      atAGlance:atAGlance
    })
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
    if(route=='create_date') return {error: false}
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

  dateCallback(start, end, year){
    this.setState({start,end,year})
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
            <div>
            <div className="stars"></div>
            <div className="twinkling"></div>
            <div className="clouds"></div>
            <div style={{position: 'relative', zIndex:4}}>
            <Signup fetchNewState = {this.fetchNewState}/>
            </div>
            </div>
          )}/>
          <Route path='/login' render={()=>(
            <div>
            <div className="stars"></div>
            <div className="twinkling"></div>
            <div className="clouds"></div>
            <div style={{position: 'relative', zIndex:4}}>
            <Login fetchNewState = {this.fetchNewState}/>
            </div>
            </div>
          )}/>
          <Route path='/home' render={()=>(
            <div>
            <div className="stars" style={{height:'135%'}}></div>
            <div className="twinkling" style={{height:'135%'}}></div>
            <div className="clouds" style={{height:'135%'}}></div>
            <div className='row' style={{position: 'relative', zIndex:4}}>
            <Nav toggleExpanded={this.toggleExpanded} expanded={this.state.nav}/>
            <Home expanded={this.state.nav}/>
            </div>
            </div>
          )}/>
          <Route path='/mosaic' render={()=>(
            <div>
            <div className="stars" style={{height:'135%'}}></div>
            <div className="twinkling" style={{height:'135%'}}></div>
            <div className="clouds" style={{height:'135%'}}></div>
            <div className='row' style={{position: 'relative', zIndex:4}}>
            <Nav toggleExpanded={this.toggleExpanded} expanded={this.state.nav}/>
            <Mosaic userId={this.state.user.id} hoist={this.hoist} keys={this.state.atAGlance} start={this.state.start} end={this.state.end} year={this.state.year} dateCallback={this.dateCallback} expanded={this.state.nav}/>
            </div>
            </div>
          )}/>
          <Route path='/journal' render={()=>(
            <div>
            <div className="stars" style={{height:'135%'}}></div>
            <div className="twinkling" style={{height:'135%'}}></div>
            <div className="clouds" style={{height:'135%'}}></div>
            <div className='row' style={{position: 'relative', zIndex:4}}>
            <Nav toggleExpanded={this.toggleExpanded} expanded={this.state.nav}/>
            <Journal journal = {this.state.activeTile} keys={this.state.atAGlance} expanded={this.state.nav}/>
            </div>
            </div>
          )}/>
          <Route path='/add/journal' render={()=>(
            <div>
            <div className="stars" style={{height:'135%'}}></div>
            <div className="twinkling" style={{height:'135%'}}></div>
            <div className="clouds" style={{height:'135%'}}></div>
            <div className='row' style={{position: 'relative', zIndex:4}}>
            <Nav toggleExpanded={this.toggleExpanded} expanded={this.state.nav}/>
            <AddJournal fetchNewState = {this.fetchNewState} journal= {this.state.activeTile} keys={this.state.atAGlance} uuid={this.state.user.id} dateCallback={this.dateCallback} expanded={this.state.nav}/>
            </div>
            </div>
          )}/>
          <Route exact path='/about' render={()=>(
            <div>
            <div className="stars"></div>
            <div className="twinkling"></div>
            <div className="clouds"></div>
            <div className='row' style={{position: 'relative', zIndex:4}}>
            <Nav toggleExpanded={this.toggleExpanded} expanded={this.state.nav}/>
            <About/>
            </div>
            </div>
          )}/>
          <Route exact path='/AtaGlance/edit' render={()=>(
            <div>
            <div className="stars" style={{height:'135%'}}></div>
            <div className="twinkling" style={{height:'135%'}}></div>
            <div className="clouds" style={{height:'135%'}}></div>
            <div className='row' style={{position: 'relative', zIndex:4}}>
            <Nav toggleExpanded={this.toggleExpanded} expanded={this.state.nav}/>
            <ChangeAtaGlance fetchNewAaG={this.fetchNewAaG} keys={this.state.atAGlance} expanded={this.state.nav}/>
            </div>
            </div>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
