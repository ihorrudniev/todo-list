import React, { Component } from 'react';
import Container from './Components/Container/Container';
import Form from './Components/Form';
import TodoList from './Components/TodoList';
import initialTodos from './todos.json';
// import './App.css';

class App extends Component {
  state = {
    todos: initialTodos,
  };

  /**data - {name, tag} из стейта формы */
  formSubmitHandler = data => {
    setTimeout(() => {
      console.log(data);
    }, 500);
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleComplited = todoId => {
    // console.log(todoId);

    // this.setState(prevState => ({
    //  todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         complited: !todo.complited,
    //       };
    //     }
    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, complited: !todo.complited } : todo,
      ),
    }));
  };

  render() {
    const { todos } = this.state;
    const totalTodoCount = todos.length;
    // вычисляемые значения
    const completedTodoCount = todos.reduce(
      (acc, todo) => (todo.complited ? acc + 1 : acc),
      0,
    );

    return (
      <Container>
        <h1>Todo List</h1>
        {/*onSubmitForm это не прослушиватель события, это проп который идет на мой компонент формы */}
        <Form onSubmitForm={this.formSubmitHandler} />
        {/* <Form onSubmitForm={this.formSubmitHandler} /> */}
        <div>
          <p>Total Todo: {totalTodoCount}</p>
          <p>Number of completed Todo: {completedTodoCount}</p>
        </div>
        <TodoList
          todos={todos}
          onToggleCompleted={this.toggleComplited}
          onDeleteTodo={this.deleteTodo}
        />
      </Container>
    );
  }
}

export default App;
