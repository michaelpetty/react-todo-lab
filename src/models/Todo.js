import axios from 'axios';

const endPoint = 'https://super-crud.herokuapp.com/todos';

class TodoModel {
  static all() {
    let request = axios.get(endPoint);
    return request;
  }
  static create(todo) {
    let request = axios.post(endPoint, todo);
    return request;
  }
  static delete(todo) {
    let request = axios.delete(`${endPoint}/${todo._id}`);
    return request;
  }
  static update(todo) {
    let request = axios.put(`${endPoint}/${todo._id}`, todo);
    return request;
  }
}

export default TodoModel;


/**
 * expected api res format (json)
 * 
{
  todos: [
    {
      _id: "6332719dbe0ff800176d5608",
      body: "Wash the dishes",
      priority: 4,
      completed: false,
      __v: 0
    },
    {
      _id: "6332719dbe0ff800176d560a",
      body: "Gaze at the stars",
      priority: 5,
      completed: false,
      __v: 0
    },
    {
      _id: "633a6e57caad6e0017f00986",
      body: "finish this to do app!",
      completed: false,
      __v: 0
    },
    {
      _id: "633a6e5bcaad6e0017f00987",
      body: "lol",
      completed: false,
      __v: 0
    }
  ]
}
 * 
 */