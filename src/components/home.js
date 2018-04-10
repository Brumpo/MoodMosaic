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
    var colors = ['#20124d', '#000a82', '#0c343d', '#3200ff', '#674ea7', '#8e7cc3','#ff00ff', '#741b47', '#4c1130', '#5b0f00', '#990000',
    '#cc0000', '#e69138', '#b45f06', '#783f04', '#7f6000', '#ff9900', '#f6b26b', '#ffd966', '#274e13',
    '#38761d', '#6aa84f', '#b6d7a8', '#6d9eeb', '#00ffff', '#0fffc7', '#00ff00', '#FFDF00']
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
    //I have the powerrrrrr!
  }
  render(){
    var col = this.props.expanded ? '8' : '11'
    return(
      <div className={`col s${col}`}>
      <div className='container row'>
      <div className='center-align'>
        <h1 className='title'>Welcome to Mood Mosaic</h1>
        </div>
        <p className='text'>Mood Mosaic delivers a fully customizable daily
        tracker that displays as a mosaic calendar to quickly glance at your progress
        for a week, month or even the whole year</p>
        <p className='text'>The colors map to the following scale (top left being worst and bottom right being best possible):</p>
        <div className='tutorial'>
        {this.state.tiles.map((tile)=><Tile tile={tile} updateAtAGlance={this.junk} hoist={this.junk} filter='tutorial'/>)}
        </div>
        <p className='text'>The colors are determined by your 3 key attributes</p>
        <p className='text'>In Mood Mosaic your attributes are completely customizable but the defaults are as follows:</p>
        <div className='row'>
        <div className='col s6'>
        <div className='center-align'>
        <ul className='text'>
        <li className='subtitle2'>Primary</li>
        <li className= 'text'>Anxiety</li>
        <li className= 'text'>Irritablity</li>
        <li className= 'text'>Mood</li>
        </ul>
        </div>
        </div>
        <div className='col s6'>
        <div className='center-align'>
        <ul className='text'>
        <li className='subtitle2'>Secondary</li>
        <li className= 'text'>Sleep</li>
        <li className= 'text'>Diet</li>
        <li className= 'text'>Professional</li>
        </ul>
        </div>
        </div>
        </div>
        <div className='row'>
        <div className='col s6'>
        <div className='center-align'>
        <Link to='/mosaic' className='button'>Continue with Defaults</Link>
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
