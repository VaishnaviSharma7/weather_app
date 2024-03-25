import React, { Component } from 'react'
import loading from "./Spinner-1s-200px.gif"

export default class Loading extends Component {
    
img = {
    width:"100px",
    height:"100px",
}
style = {
  width:"100%",
  height:"100%",
  alignContent:"center",
  justifyContent:"center",
  display:"flex",
  // margin:"200px"
}
  render() {
  
    return (
      <div style={this.style}>
       <img src={loading} alt="" style={this.img}/>
      </div>
    )
  }
}
