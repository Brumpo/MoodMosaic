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
    var year = this.props.year
    var date = yeartodate(mid, year)
    var months = ['January','Febuary','March','April','May','June','July','August'
    ,'September','October','November','December']
    var title = ''
    switch (this.state.filter) {
      case 'month':
        let monthi = date.getMonth()
        title = `${months[monthi]} ${year}`
        break;
      case 'week':
        let start = yeartodate(date.getFOW(), year)
        let startmonthi = start.getMonth()
        let startday = start.toString().split(' ')[2]
        let end = yeartodate(date.getLOW(), year)
        let endmonthi = end.getMonth()
        let endday = end.toString().split(' ')[2]
        title = startmonthi==endmonthi ? `Week of ${months[startmonthi]} ${startday}-${endday}` : `Week of ${months[startmonthi]} ${startday}-${months[endmonthi]} ${endday}`
        break;
      default:
        title = year
    }
    return title
  }

  render(){
    console.log(this.state)
    var title = this.getTitle()
    console.log(title, 'title');
    var col = this.props.expanded ? '8' : '11'
    return(
      <div className={`col s${col}`}>
      <Redirect to={`/mosaic/?start=${this.props.start}&end=${this.props.end}&year=${this.props.year}`}/>
      <div className='row'>
        <div className='container col s9'>
        <div className='center-align'>
        <h3 className='title'>{title}</h3>
        </div>
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
      <div id='marginRight'className='center-align'>
      <Scroll getTiles={this.getTiles} filter={this.state.filter}
       start={this.props.start} end={this.props.end}
       mid={Math.max((this.props.start + this.props.end)/2)} year={this.props.year}/>
      </div>
      </div>
    )
  }
}
