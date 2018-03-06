import React, { Component } from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import Scroll from './scroll.js';
import Nav from './nav.js';
import Tile from './tiles.js'
import AtAGlance from './atAGlance.js'
import {setUp} from '../dateProto.js'

export default class Mosaic extends Component{
  constructor(props) {
    super(props)
    this.state = {
      filter:'month',
      start: -1,
      end: -1,
      tiles: []
    }
    this.changeFilter = this.changeFilter.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount(){
    setUp()
    let today = new Date()
    let start = today.getFOM()
    let end = today.getLOM()
    let year = today.getYear()+1900
    let dayofyear = today.getDOY()
    console.log(start,end);
    this.setState({
      start,
      end
    })
  }

  changeFilter(filter,start,end){
    this.setState({filter})
  }

  render(){
    if(this.state.filter==='week'){
      return(
        <div>
          <Nav/>
          <h1>week</h1>
          <Scroll changeFilter={this.changeFilter} filter={this.state.filter}
           start={this.state.start} end={this.state.end}/>
          <AtAGlance/>
        </div>
      )
    }else if(this.state.filter==='year'){
      return(
        <div>
          <Nav/>
          <h1>year</h1>
          <Scroll changeFilter={this.changeFilter} filter={this.state.filter}
           start={this.state.start} end={this.state.end}/>
          <AtAGlance/>
        </div>
      )
    }else{
      return(
        <div>
          <Nav/>
          <h1>month</h1>
          <Scroll changeFilter={this.changeFilter} filter={this.state.filter}
           start={this.state.start} end={this.state.end}/>
          <AtAGlance/>
        </div>
      )
    }
  }
}
