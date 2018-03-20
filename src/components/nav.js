import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import {Link} from 'react-router-dom'

export default class Nav extends Component{
  constructor(props) {
    super(props)
    this.state={
      expanded: false,
      sidebarOpen: false
    }
    this.toggleExpanded = this.toggleExpanded.bind(this)
    this.logout = this.logout.bind(this)
  }

  toggleExpanded(){
    let state = this.state.expanded ? false : true
    this.setState({
      expanded:state
    })
  }

  logout(){

  }

  render(){
    let col = this.state.expanded ? '3' : '1'
    let backgroundColor = this.state.expanded ? {backgroundColor: '#4B4B4B'} : {backgroundColor: 'inherit'}
    return(
      <div className={`col s${col}`} id='navslide' style={backgroundColor}>
        <div onClick={(e)=>{this.toggleExpanded()}}>
        <i id='Navburger' className="material-icons">menu</i>
        </div>
        <div className='nav'>
          {this.state.expanded ?
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
