import React, { Component } from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import Scroll from './scroll.js';
import Nav from './nav.js';
import Tile from './tiles.js'
import AtAGlance from './atAGlance.js'
import setUp from '../dateProto.js'

export default class Mosaic extends Component{
  constructor(props) {
    super(props)
    this.state = {
      filter:'month',
      tiles: []
    }
    this.changeFilter = this.changeFilter.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount(){
    setUp()
    let today = new Date()
    let year = today.getYear()+1900
    let dayofyear = today.getDOY()
    console.log(dayofyear);
  }

  changeFilter(filter){
    this.setState({filter})
  }

  render(){
    if(this.state.filter==='week'){
      return(
        <div>
          <Nav/>
          <h1>week</h1>
          <Scroll changeFilter={this.changeFilter}/>
          <AtAGlance/>
        </div>
      )
    }else if(this.state.filter==='year'){
      return(
        <div>
          <Nav/>
          <h1>year</h1>
          <Scroll changeFilter={this.changeFilter}/>
          <AtAGlance/>
        </div>
      )
    }else{
      return(
        <div>
          <Nav/>
          <h1>month</h1>
          <Scroll changeFilter={this.changeFilter}/>
          <AtAGlance/>
        </div>
      )
    }
  }
}
