import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import {Link} from 'react-router-dom'

export default class Nav extends Component{

  render(){
    let col = this.props.expanded ? '3' : '1'
    let backgroundColor = this.props.expanded ? {backgroundColor: '#4B4B4B'} : {backgroundColor: 'inherit'}
    return(
      <div className={`col s${col}`} id='navslide' style={backgroundColor}>
        <div onClick={(e)=>{this.props.toggleExpanded()}}>
        <i id='Navburger' className="material-icons">menu</i>
        </div>
        <div className='nav'>
          {this.props.expanded ?
            <div>
            <ul className='text'>
              <li><Link to='/Mosaic' style={{color: 'white'}}>Mosaic</Link></li>
              <li><Link to='/About' style={{color: 'white'}}>About</Link></li>
              <li><Link to='/AtaGlance/edit' style={{color: 'white'}}>Change Attributes</Link></li>
              <li><Link to='/' style={{color: 'white'}}>Logout</Link></li>
            </ul>
            </div>
            :null}
        </div>
      </div>
    )
  }
}
