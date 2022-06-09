import React, { Component } from 'react';
import Form from './Components/Form';
import TodoList from './Components/TodoList';
import initialTodos from './todos.json';
import './App.css';

class App extends Component {
  state = {
    todos: initialTodos,
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  /**data - {name, tag} из стейта формы */
  formSubmitHandler = data => {
    setTimeout(() => {
      console.log(data);
    }, 1000);
  };

  render() {
    // вычисляемые значения
    const { todos } = this.state;

    const totalTodoCount = todos.length;
    const completedTodoCount = todos.reduce(
      (acc, todo) => (todo.complited ? acc + 1 : acc),
      0,
    );

    return (
      <div className="Container">
        <h1>Todo List</h1>
        {/*onSubmitForm это не прослушиватель события, это проп который идет на мой компонент формы */}
        <Form onSubmitForm={this.formSubmitHandler} />
        {/* <Form onSubmitForm={this.formSubmitHandler} /> */}
        <p>Total Todo: {totalTodoCount}</p>
        <p>Number of completed Todo: {completedTodoCount}</p>
        <TodoList todos={todos} onDeleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default App;
