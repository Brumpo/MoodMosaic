import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom';

export default class Tile extends Component {
  constructor(props) {
    super(props)
    this.displayAtAGlance = this.displayAtAGlance.bind(this)
    this.colors = this.colors.bind(this)
  }

  displayAtAGlance(start){
    var atAGlance = start ? this.props.tile : {default : 'please mouse over a tile to view at a glance stats for that day'}
    this.props.updateAtAGlance(atAGlance)
  }

  colors(){
    if(!this.props.tile.x1) return {backgroundColor: '#fff'}
    let sum = (parseInt(this.props.tile.x1.split(',')[1]) + parseInt(this.props.tile.x2.split(',')[1]) + parseInt(this.props.tile.x3.split(',')[1])) - 3
    let colors = ['#20124d', '#000a82', '#3200ff', '#674ea7', '#8e7cc3', '#741b47', '#4c1130', '#5b0f00', '#990000',
    '#cc0000', '#e69138', '#b45f06', '#783f04', '#7f6000', '#ff9900', '#f6b26b', '#ffd966', '#0c343d', '#274e13',
    '#38761d', '#6aa84f', '#b6d7a8', '#00ff00', '#6d9eeb', '#00ffff', '#ff00ff', '#0fffc7', '#00ff00']
    return {backgroundColor: colors[sum]}
  }

  render(){
    console.log('intile')
    if(this.props.tile.backgroundColor){
      return(
        <div className='tile' style={this.props.tile}>
        </div>
      )
    }else{
      return(
        <Link to={`/journal/?day=${this.props.tile.day}&year=${this.props.tile.year}`}>
        <div className='tile' onMouseEnter={(e)=>{this.displayAtAGlance(true)}}
                              onMouseLeave={(e)=>{this.displayAtAGlance(false)}}
                              onClick={(e)=>{this.props.hoist(this.props.tile)}}
                              style={this.colors()}>
          <p>{this.props.tile.day}</p>
        </div>
        </Link>
      )
    }
  }
}
