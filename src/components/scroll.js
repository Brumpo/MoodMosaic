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
    var start = this.props.start
    var end = this.props.end
    var year = this.props.year
    var mid = this.props.mid
    var date = yeartodate(mid, year)
    var isLeap = date.isLeapYear()
    if(filter === this.props.filter) return
    switch (filter) {
      case 'week':
        if(this.props.filter === 'year') date = yeartodate(1,year) //reset to january if its a year
        start = date.getFOW()
        end = date.getLOW()
        if(start<0){
           start = Math.abs(start)
        }
        break;
      case 'month':
        if(this.props.filter === 'year') date = yeartodate(1,year) //reset to january if its a year
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
          if(start<7){
            date = yeartodate(365, --year)
            start = date.getFOW()
            end = date.getLOW()
            if(start<0){
               start = Math.abs(start)
            }
          }else{
            start = start - 7
            end = end - 7
          }
        }else if(this.props.filter === 'month'){
          if(this.props.mid-30<=0){
            --year
            mid = 395-mid
          }
          date = yeartodate(mid - 30,year)
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
          if(start>358){
            date = yeartodate(1, ++year)
            start = date.getFOW()
            end = date.getLOW()
          }else{
            start = start + 7
            end = end + 7
          }
        }else if(this.props.filter === 'month'){
          if((mid+ 30) >= (365+isLeap)){
            ++year
            mid = mid-365
          }
          date = yeartodate((mid + 30), year)
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
    if(!start) start = this.props.start
    if(!end) end = this.props.end
    this.props.getTiles(start,end,year,filter)
  }

  render(){
    return(
      <div className='subtitle2'>
        <span onClick={(e)=>{this.onClick('back')}}>{'<< '}</span>
        <span onClick={(e)=>{this.onClick('week')}}>week | </span>
        <span onClick={(e)=>{this.onClick('month')}}>month | </span>
        <span onClick={(e)=>{this.onClick('year')}}>year </span>
        <span onClick={(e)=>{this.onClick('forward')}}>{'>>'}</span>
      </div>
    )
  }
}
