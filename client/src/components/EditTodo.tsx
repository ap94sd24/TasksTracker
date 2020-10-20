import React, { Fragment, useState } from 'react';
import { IActionProps } from '../types/todo';

const EditTodo = ({ todo }: IActionProps) => {
  const [description, setDescription] = useState(todo.description);

  // edit description
  const updateDescription = async (e: any) => {
    e.preventDefault();
    try {
      const body = { description };

      // proxy 

      await fetch(`/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      window.location.assign('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Fragment>
      {/**Button to open modal */}
      <button
        type='button'
        className='btn btn-warning'
        data-toggle='modal'
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>
      {/** Modal portion */}
      <div
        className='modal fade'
        id={`id${todo.todo_id}`}
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
        onClick={() => setDescription(todo.description)}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit Task
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
                onClick={() => setDescription(todo.description)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <input
                type='text'
                className='form-control'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-warning'
                onClick={(e) => updateDescription(e)}
                data-dismiss='modal'
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
