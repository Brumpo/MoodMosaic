import React, { Component } from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom';
import {yeartodate, setUp} from '../dateProto'


export default class Scroll extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(filter){
    setUp()
    var start
    var end
    var year = this.props.year
    var date = yeartodate(this.props.mid, this.props.year)
    var isLeap = date.isLeapYear()
    if(filter === this.props.filter) return
    switch (filter) {
      case 'week':
        if(this.props.filter === 'year') date = yeartodate(1,this.props.year) //reset to january if its a year
        start = date.getFOW()
        end = date.getLOW()
        break;
      case 'month':
        if(this.props.filter === 'year') date = yeartodate(1,this.props.year) //reset to january if its a year
        start = date.getFOM()
        end = date.getLOM()
        break;
      case 'year':
        start = 1
        end = 365 + isLeap
        break;
      case 'back':
        filter = this.props.filter
        if(this.props.filter === 'week'){
          start = this.props.start - 7
          end = this.props.end - 7
        }else if(this.props.filter === 'month'){
          date = yeartodate(this.props.mid - 30,this.props.year)
          start = date.getFOM()
          end = date.getLOM()
        }else{
          start = 1
          end = 365 + isLeap
          year--
        }
        break;
      case 'forward':
        filter = this.props.filter
        if(this.props.filter === 'week'){
          start = this.props.start + 7
          end = this.props.end + 7
        }else if(this.props.filter === 'month'){
          date = yeartodate(this.props.mid + 30)
          start = date.getFOM()
          end = date.getLOM()
        }else{
          start = 1
          end = 365 + isLeap
          year++
        }
        break;
      default:
        start = this.props.start
        end = this.props.end
    }
    this.props.getTiles(start,end,year,filter)
  }

  render(){
    return(
      <div>
        <span onClick={(e)=>{this.onClick('back')}}>{'<< '}</span>
        <span onClick={(e)=>{this.onClick('week')}}>week | </span>
        <span onClick={(e)=>{this.onClick('month')}}>month | </span>
        <span onClick={(e)=>{this.onClick('year')}}>year </span>
        <span onClick={(e)=>{this.onClick('forward')}}>{'>>'}</span>
      </div>
    )
  }
}
