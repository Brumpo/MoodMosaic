import React, { Component } from 'react';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';
import Scroll from './scroll.js';
import Nav from './nav.js';
import Tile from './tiles.js'
import AtAGlance from './atAGlance.js'
import Journal from './journal.js'
import AddJournal from './addJournal'
import {setUp, yeartodate} from '../dateProto.js'
import seeds from '../seeders.js'

export default class Mosaic extends Component{
  constructor(props) {
    super(props)
    this.state = {
      filter:'month',
      start: -1,
      end: -1,
      year: 2018,
      tiles: [],
      atAGlance: 'please mouse over a tile to view at a glance stats for that day'
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateAtAGlance = this.updateAtAGlance.bind(this)
    this.getTiles = this.getTiles.bind(this)
  }

  async componentDidMount(){
    setUp()
    let today = new Date()
    let start = today.getFOM()
    let end = today.getLOM()
    let year = today.getFullYear()
    console.log(start,end)
    this.getTiles(start, end, year)
  }

  async getTiles(start, end, year, filter = this.state.filter){
    let result = await fetch(`http://localhost:4200/api/dates/?uuid=${this.props.userId}&year=${year}&start=${start}&end=${end}`)
    let json = await result.json()
    this.setState({
      start: start,
      end: end,
      year: year,
      tiles: json.data,
      filter: filter
    })
  }

  updateAtAGlance(atAGlance){
    this.setState({
      atAGlance
    })
  }

  render(){
    console.log(this.state)
    return(
      <div>
      <Redirect to={`/mosaic/?start=${this.state.start}&end=${this.state.end}&year=${this.state.year}`}/>
      <div>
        <div>
          <div className={this.state.filter}>
          {
            this.state.tiles.map((tile)=>{
              if(tile.day>=this.state.start){
                if(tile.day<=this.state.end){
                  return (<Tile tile={tile}
                    updateAtAGlance={this.updateAtAGlance}
                    toggleJournal={this.toggleJournal}
                    hoist={this.props.hoist}/>)
                }
              }
            })
          }
          </div>
          <Scroll getTiles={this.getTiles} filter={this.state.filter}
           start={this.state.start} end={this.state.end}
           mid={Math.max(this.state.start + this.state.end)/2} year={this.state.year}/>
          <AtAGlance atAGlance={this.state.atAGlance}/>
        </div>
      </div>
      </div>
    )
  }
}
