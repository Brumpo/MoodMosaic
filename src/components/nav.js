import React, { Component } from 'react';

export default class Nav extends Component{
  constructor(props) {
    super(props)
    this.state={
      expanded: false
    }
    this.toggleExpanded = this.toggleExpanded.bind(this)
  }

  toggleExpanded(){
    let state = this.state.expanded ? false : true
    this.setState({
      expanded:state
    })
  }

  render(){
    return(
      <div>
        <i id='Navburger' className="material-icons">menu</i>
        <div className='nav'>
          {this.state.expanded ?
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Help</li>
            </ul>
            :null}
        </div>
      </div>
    )
  }
}
