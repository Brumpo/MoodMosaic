import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom';

export default class Tile extends Component {
  constructor(props) {
    super(props)
    this.displayAtAGlance = this.displayAtAGlance.bind(this)
  }

  displayAtAGlance(start){
    var atAGlance = start ? this.props.tile.atAGlance : 'please mouse over a tile to view at a glance stats for that day'
    this.props.updateAtAGlance(atAGlance)
  }

  render(){
    return(
      <Link to={`/journal/?day=${this.props.tile.day}&year=${this.props.tile.year}`}>
      <div className='tile' onMouseEnter={(e)=>{this.displayAtAGlance(true)}}
                            onMouseLeave={(e)=>{this.displayAtAGlance(false)}}
                            onClick={(e)=>{this.props.hoist(this.props.tile)}}>
        <p>{this.props.tile.day}</p>
      </div>
      </Link>
    )
  }
}
