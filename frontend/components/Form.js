import React from 'react'

export default class Form extends React.Component {
  render() {

    return (
      <>
        <form id="todoForm" onSubmit={this.props.onSubmit}>
          <input
            value={this.props.name}
            onChange={this.props.onNameChange}
            type="text"
            placeholder="Input Todo">

          </input>
          <input type="submit"></input>
        </form>
        <button
          onClick={this.props.removeCompleted}>
          {this.props.displayCompleteds ? 'Hide' : 'Show'}
          Completed
        </button>
      </>
    )
  }
}
