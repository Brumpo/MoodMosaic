import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Tile from './tiles.js'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      tiles : []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount(){
    var colors = ['#20124d', '#000a82', '#3200ff', '#674ea7', '#8e7cc3', '#741b47', '#4c1130', '#5b0f00', '#990000',
    '#cc0000', '#e69138', '#b45f06', '#783f04', '#7f6000', '#ff9900', '#f6b26b', '#ffd966', '#0c343d', '#274e13',
    '#38761d', '#6aa84f', '#b6d7a8', '#00ff00', '#6d9eeb', '#00ffff', '#ff00ff', '#0fffc7', '#00ff00']
    var tiles = []
    for (var i = 0; i < colors.length; i++) {
      tiles.push({
        backgroundColor: {backgroundColor: colors[i]}
      })
    }
    this.setState({tiles})
  }

  junk(fake,funct,trick){
    //this is a dead end......
    //By the power of greyskull
  }
  render(){
    var col = this.props.expanded ? '8' : '11'
    return(
      <div className={`col s${col}`}>
      <div className='container row'>
        <h1 className='title'>Welcome to Moodmosaic</h1>
        <p className='text'>Moodmosaic delivers a fully customizable daily
        tracker that displays as a mosaic calendar to quickly glance at your progress
        for a week, month or even the whole year</p>
        <p className='text'>The colors map to the following scale:</p>
        <div className='tutorial'>
        {this.state.tiles.map((tile)=><Tile tile={tile} updateAtAGlance={this.junk} hoist={this.junk} filter='tutorial'/>)}
        </div>
        <div className='row'>
        <div className='col s6'>
        <div className='center-align'>
        <Link to='/mosaic' className='button'>Continue with defaults</Link>
        </div>
        </div>
        <div className='col s6'>
        <div className='center-align'>
        <Link to='/AtaGlance/edit' className='button'>Customize Attributes</Link>
        </div>
        </div>
        </div>
      </div>
      </div>
    )
  }
}
