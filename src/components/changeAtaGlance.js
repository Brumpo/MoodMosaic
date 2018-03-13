import React, { Component } from 'react';

export default class ChangeAtaGlance extends Component {
  constructor(props) {
      super(props)
      this.state = {
        error: false
      }
      this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(e){
    e.preventDefault()
    var body = {
      key1: this.refs.core1.value,
      key2: this.refs.core2.value,
      key3: this.refs.core3.value,
      key4: this.refs.support1.value,
      key5: this.refs.support2.value,
      key6: this.refs.support3.value,
    }
    var method = 'PATCH'
    var route = 'user/aag'
    var result = await this.props.fetchNewAaG(method, body, route)
    this.setState({
      error: result.error
    })
  }

  render(){
    return(
      <form onSubmit={this.onSubmit}>
        <input type='text' ref='core1' placeholder='core1'></input>
        <input type='text' ref='core2' placeholder='core2'></input>
        <input type='text' ref='core3' placeholder='core3'></input>
        <input type='text' ref='support1' placeholder='support1'></input>
        <input type='text' ref='support2' placeholder='support2'></input>
        <input type='text' ref='support3' placeholder='support3'></input>
        <input type='submit'></input>
      </form>
    )
  }
}
