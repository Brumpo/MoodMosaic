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
      tiles.push({backgroundColor: colors[i]})
    }
    this.setState({tiles})
  }

  render(){
    return(
      <div>
        <h1 className='title'>Welcome to Moodmosaic</h1>
        <p className='text'>Moodmosaic delivers a fully customizable daily
        tracker that displays as a mosaic calendar to quickly glance at your progress
        for a week, month or even the whole year</p>
        <p className='text'>The colors map to the following scale:</p>
        <div className='tutorial'>
        {this.state.tiles.map((tile)=><Tile tile={tile}/>)}
        </div>
        <Link to='/mosaic'>Continue</Link>
      </div>
    )
  }
}
