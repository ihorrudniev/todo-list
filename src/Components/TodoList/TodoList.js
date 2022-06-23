import React from 'react';
import classNames from 'classnames';
import Todo from '../Todo';
import './TodoList.scss';

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => (
  <ul className="TodoList">
    {todos.map(({ id, text, complited }) => (
      <li
        key={id}
        className={classNames('TodoList__item', {
          'TodoList__item--completed': complited,
        })}
      >
        <Todo
          text={text}
          complited={complited}
          onToggleCompleted={() => onToggleCompleted(id)}
          onDeleteTodo={() => onDeleteTodo(id)}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
