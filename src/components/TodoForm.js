import React, { Component } from 'react'

class TodoForm extends Component {
    state = {
      todo: ''
    }

  onChange = (e) => {
    this.setState({
      todo: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const todo = this.props.todo;
    todo.body = this.state.todo;
    this.props.updateTodo(todo);
    this.setState({ todo: '' });
    this.props.toggleBodyForm();
  }

  render(){
    return (
      <div style={this.props.style} className='todoForm'>
        <form onSubmit={ this.onSubmit }>
          <input
            autoFocus={this.props.autoFocus}
            onChange={ this.onChange }
            placeholder='Write a todo here ...'
            type='text'
            value={this.state.todo} />
          <button type='submit'>Save</button>
        </form>
      </div>
    )
  }
}

export default TodoForm;
