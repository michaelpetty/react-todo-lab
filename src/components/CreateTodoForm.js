import React, {Component} from 'react';

class CreateToDoForm extends Component {
  state = {
    todo: ''
  }

  onInputChange = e => {
    this.setState({
      todo: e.target.value
    })
  }
  onFormSubmit = e => {
    e.preventDefault();
    let todo = this.state.todo;
    this.props.createTodo(todo);
    this.setState({
      todo: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} id="taskForm">
          <input onChange={this.onInputChange} type="text" id="newItemDescription" placeholder="Honey, Do this" value={this.state.todo} />
          <button type="submit" id="addTask" className="btn">NOW!</button>
        </form>
      </div>
    )
  }
}

export default CreateToDoForm;
