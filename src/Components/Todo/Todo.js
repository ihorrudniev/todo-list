import React from 'react';
// import IconButton from '../IconButton';
// import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
// import './TodoList.scss';

const Todo = ({ text, complited, onToggleCompleted, onDeleteTodo }) => {
  return (
    <>
      {' '}
      <input
        type="checkbox"
        className="TodoList__checkbox"
        checked={complited}
        onChange={onToggleCompleted}
      />
      <p className="TodoList__text">{text}</p>
      <button type="button" className="TodoList__btn" onClick={onDeleteTodo}>
        Delete
      </button>
      {/* <IconButton>
        <DeleteIcon
          width="40"
          height="40"
          fill="white"
          onClick={onDeleteTodo}
        />
      </IconButton> */}
    </>
  );
};

export default Todo;
