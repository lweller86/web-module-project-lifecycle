import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'


export default class App extends React.Component {
  state={
    todos:[],
    error:'',
    name:'',
  }

  onNameChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, name: value})
  }

fetchAllTodos= () => {
  axios.get(URL)
  .then(res => {
    this.setState({... this.state, todos: res.data.data})
  })
  .catch(err => {
    this.setState({ ...this.state, error: err.response.data.message})
  })
}

postNewTodo = () => {
  axios.post(URL, {name: this.state.name})
  .then(res=> {
    this.fetchAllTodos()
    this.setState({...this.state, name:''})
  })
  .catch(err => {
    debugger
  })
}
onSubmit = evt => {
  evt.preventDefault()
  this.postNewTodo()

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
          {this.state.todos.map(td => {
            return <div key={td.id}>{td.name} </div>
          })}
        </div>
        <form id="todoForm" onSubmit={this.onSubmit}>
        <input value={this.state.name} onChange={this.onNameChange} type="text" placeholder="Input Todo"></input>
        <input type="submit"></input>
        <button>Clear Completed</button>     
      </form>
      </div>
    )
  }
}
