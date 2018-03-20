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
      tiles: [],
      atAGlance: {default: 'please mouse over a tile to view at a glance stats for that day'},
      padFront:0,
      padEnd:0,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateAtAGlance = this.updateAtAGlance.bind(this)
    this.getTiles = this.getTiles.bind(this)
    this.normalizeTiles = this.normalizeTiles.bind(this)
    this.getTitle = this.getTitle.bind(this)
  }

  normalizeTiles(){
    setUp()
    if(this.props.start==-1) return
    const length = (this.props.end-this.props.start) + 1
    var tiles = []
    if(this.state.filter=='month'){
      var padding = yeartodate(this.props.start, this.props.year).getFOW()
      var padFront = this.props.start - padding
      if(padding<0){
        padFront = padding + 367
      }
      var padEnd= yeartodate(this.props.end, this.props.year).getLOW() - this.props.end
      console.log('padFront', padFront)
      for (let i = 1; i < padFront; i++) {
        tiles.push({
          backgroundColor: {backgroundColor: 'black'}
        })
      }
    }
    var day = this.props.start
    for(let i=0;i<length;i++){
      tiles.push(this.state.tiles[i] ||
        {
         day,
         year : this.props.year,
         userId : this.props.userId,
         x1 : '',
         x2 : '',
         x3 : '',
         x4 : '',
         x5 : '',
         x6 : '',
         summary : '',
         journal : '',
         backgroundColor: {backgroundColor: 'white'},
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
    let start = this.props.start || today.getFOM()
    let end = this.props.end || today.getLOM()
    let year = this.props.year || today.getFullYear()
    console.log(start,end)
    this.getTiles(start, end, year)
  }

  async getTiles(start, end, year, filter = this.state.filter){
    console.log(this.props.userId, 'LOOK AT ME')
    let result = await fetch(`http://localhost:4200/api/dates/?uuid=${this.props.userId}&year=${year}&start=${start}&end=${end}`)
    let json = await result.json()
    this.props.dateCallback(start,end,year)
    this.setState({
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

  getTitle(){
    setUp()
    var mid = Math.max((this.props.start + this.props.end)/2)
    var date = yeartodate(mid, this.props.year)
    var monthIndex = date.getMonth()
    }

  render(){
    console.log(this.state)
    return(
      <div>
      <Redirect to={`/mosaic/?start=${this.props.start}&end=${this.props.end}&year=${this.props.year}`}/>
      <div className='row'>
        <div className='container col s9'>
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
                start={this.props.start}
                end={this.props.end}
                filter={this.state.filter}/>)
            })
          }
          </div>
        </div>
      <div id='AaG' className='container col s3'>
      <AtAGlance atAGlance={this.state.atAGlance} keys={this.props.keys}/>
      </div>
      </div>
      <div className='center-align'>
      <Scroll getTiles={this.getTiles} filter={this.state.filter}
       start={this.props.start} end={this.props.end}
       mid={Math.max((this.props.start + this.props.end)/2)} year={this.props.year}/>
      </div>
      </div>
    )
  }
}
