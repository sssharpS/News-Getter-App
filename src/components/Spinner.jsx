import React, { Component } from 'react'

export default class Spinner extends Component {
 

  render() {
    return (
      <>
        <div className=" spinner-grow " role="status">
  <span className="visually-hidden">Loading...</span>
</div>
      </>
    )
  }
}
