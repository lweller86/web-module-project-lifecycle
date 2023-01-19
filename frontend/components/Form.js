import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <form id="todoForm">
        <input value={this.state.name} type="text" placeholder="Input Todo"></input>
        <input type="submit"></input>
        <button>Clear Completed</button>     
      </form>
    )
  }
}
