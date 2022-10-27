import React, { useState } from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import SimpleBar from 'simplebar-react';

import user1 from '../../../assets/images/users/user1.jpg';
import user2 from '../../../assets/images/users/user2.jpg';
import user3 from '../../../assets/images/users/user3.jpg';
import user4 from '../../../assets/images/users/user4.jpg';

const TaskList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      completed: false,
      labelname: 'Today',
      labelcolor: 'danger',
      image1: user1,
      image2: user2,
      time: '1 August 2019',
    },
    {
      id: 2,
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      completed: false,
      labelname: '1 week',
      labelcolor: 'primary',
      image1: user3,
      image2: user4,
      time: '26 Jun 2017',
    },
    {
      id: 3,
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      completed: false,
      labelname: 'Yesterday',
      labelcolor: 'info',
      image1: user3,
      image2: user4,
      time: '20 July 2018',
    },
    {
      id: 4,
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      completed: false,
      labelname: '2 week',
      labelcolor: 'warning',
      image1: user3,
      image2: user4,
      time: '26 jun 2017',
    },
  ]);

  const toggleComplete = (todoId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      }),
    );
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <Card>
      <span className="lstick bg-info"></span>
      <CardBody>
        <CardTitle tag="h4">Task List</CardTitle>
        <SimpleBar style={{ height: '452px' }}>
          <div className="todo-widget">
            <ListGroup className="list-task todo-list list-group mb-0 " data-role="tasklist">
              {todos.map((todo) => (
                <ListGroupItem
                  className={`list-group-item todo-item border-0 d-flex ps-0 ${
                    todo.completed ? 'completed' : ''
                  }`}
                  key={todo.id}
                >
                  <div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        defaultChecked={todo.completed}
                        id={todo.id}
                        className="form-check-input"
                        data-toggle="checkbox"
                        onClick={() => toggleComplete(todo.id)}
                      />
                      <label className="form-check-label todo-label fw-normal" htmlFor={todo.id}>
                        <span className="todo-desc">{todo.content}</span>
                      </label>
                    </div>

                    <span className={`rounded-pill ms-4 mt-2 badge bg-${todo.labelcolor}`}>
                      {todo.labelname}
                    </span>

                    <div className="d-flex align-items-center">
                      <span className="text-muted ms-4 mt-2 fs-7">{todo.time}</span>
                      <ul className="list-inline ms-4 mt-2">
                        <li className="list-inline-item">
                          <img
                            src={todo.image1}
                            alt="user"
                            className="rounded-circle img-fluid"
                            width="30"
                          />
                        </li>
                        <li className="list-inline-item">
                          <img
                            src={todo.image2}
                            alt="user"
                            className="rounded-circle img-fluid"
                            width="30"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <span onClick={() => deleteTodo(todo.id)}>
                      <i className="bi bi-trash fs-4"></i>
                    </span>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </SimpleBar>
      </CardBody>
    </Card>
  );
};

export default TaskList;
