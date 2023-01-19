import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'


export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    name: '',
    displayCompleteds: false
  }

  setAxiosResponseError = err => this.setState({ ...this.state, error: err.respnse.data.message })

  resetForm = () => this.setState({ ...this.state, name: '' })



  onNameChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, name: value })
  }



  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ... this.state, todos: res.data.data })
      })
      .catch(this.setAxiosResponseError)
  }



  postNewTodo = () => {
    axios.post(URL, { name: this.state.name })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()

      })
      .catch(this.setAxiosResponseError)
  }

  toggleComplete = id => evt => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(td => {
            if (td.id !== id) return td
            return res.data.data
          })
        })
      })
      .catch(this.setAxiosResponseError)
  }

  onSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()

  }

  removeCompleted = () => {
    this.setState({ ...this.state, displayCompleteds: !this.state.displayComplteds })
  }


  componentDidMount() {
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id="errors">Error:{this.state.error} </div>
        <div id="todos">
          <h2>Todos:</h2>
          {this.state.todos.reduce((acc, td) => {
            if (this.state.displayCompleteds || !td.completed ) return acc.concat(
              <div key={td.id} onClick={this.toggleComplete(td.id)}>{td.name} {td.completed ? ' ✔️' : ''} </div>
              )
            else return acc
          }, [])

           // 
          }
        </div>
        <form id="todoForm" onSubmit={this.onSubmit}>
          <input value={this.state.name} onChange={this.onNameChange} type="text" placeholder="Input Todo"></input>
          <input type="submit"></input>

        </form>
        <button onClick={this.removeCompleted}>{this.state.displayCompleteds ? 'Hide' : 'Show'}Clear Completed</button>
      </div>
    )
  }
}
