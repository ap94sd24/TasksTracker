import React, { Fragment, useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // delete todo
  const deleteTodo = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    try {
      const res = await fetch('http://localhost:5000/todos');
      const jsonData = await res.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Fragment>
      <table className='table table-hover mt-5 text-center'>
        <thead>
          <tr>
            <th scope='col'>Description</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/** <tr>
            <th scope='row'>2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr> */}
          {todos.map((todo: Todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
