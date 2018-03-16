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
      atAGlance: {default: 'please mouse over a tile to view at a glance stats for that day'},
      padFront:0,
      padEnd:0,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateAtAGlance = this.updateAtAGlance.bind(this)
    this.getTiles = this.getTiles.bind(this)
    this.normalizeTiles = this.normalizeTiles.bind(this)
  }

  normalizeTiles(){
    setUp()
    if(this.state.start==-1) return
    const length = (this.state.end-this.state.start) + 1
    console.log(length, this.state.tiles.length);
    var tiles = []
    if(this.state.filter=='month'){
      var padFront = this.state.start - yeartodate(this.state.start, this.state.year).getFOW()
      var padEnd= yeartodate(this.state.end, this.state.year).getLOW() - this.state.end
      console.log('padFront', padFront)
      for (var i = 1; i < padFront; i++) {
        tiles.push({backgroundColor: 'black'})
      }
    }
    var day = this.state.start
    for(let i=0;i<length;i++){
      tiles.push(this.state.tiles[i] ||
        {
         day,
         year : '',
         userId : '',
         x1 : '',
         x2 : '',
         x3 : '',
         x4 : '',
         x5 : '',
         x6 : '',
         summary : '',
         journal : '',
         })
      day++
    }
    this.setState({
      tiles
    })
    return
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
    this.normalizeTiles()
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
      <div className='row'>
        <div id={this.state.filter} className='col s9'>
          <div className={this.state.filter}>
          {
            this.state.tiles.map((tile)=>{
              return (<Tile tile={tile}
                updateAtAGlance={this.updateAtAGlance}
                toggleJournal={this.toggleJournal}
                hoist={this.props.hoist}
                keys={this.props.keys}
                padFront={this.state.padFront}
                padEnd={this.state.padEnd}
                start={this.state.start}
                end={this.state.end}/>)
            })
          }
          </div>
        </div>
      <div id= 'AaG' className='container col s3'>
      <AtAGlance atAGlance={this.state.atAGlance} keys={this.props.keys}/>
      </div>
      </div>
      <Scroll getTiles={this.getTiles} filter={this.state.filter}
       start={this.state.start} end={this.state.end}
       mid={Math.max((this.state.start + this.state.end)/2)} year={this.state.year}/>
      </div>
    )
  }
}
