import React, { Component } from 'react';
import shortid from 'shortid';
import Container from './Components/Container/Container';
// import Form from './Components/Form';
import TodoEditor from './Components/TodoEditor';
import Filter from './Components/Filter/Filter';
import TodoList from './Components/TodoList';
import initialTodos from './todos.json';
// import './App.css';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      complited: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));

    // console.log(text);
  };

  // =====data - {name, tag} из стейта формы ======
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

  // =====method update Todo on click checkbox=====
  toggleComplited = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, complited: !todo.complited } : todo,
      ),
    }));
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
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  // вычисляемые значения
  getVisibleTodos = () => {
    const { todos, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return todos.filter(todo =>
      todo.text.toLocaleLowerCase().includes(normalizedFilter),
    );
  };

  // вычисляемые значения
  calculateCompletedTodoCount = () => {
    const { todos } = this.state;
    return todos.reduce((acc, todo) => (todo.complited ? acc + 1 : acc), 0);
  };

  render() {
    const { todos, filter } = this.state;
    const totalTodoCount = todos.length;

    const completedTodoCount = this.calculateCompletedTodoCount();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <h1>Todo List</h1>
        {/*onSubmitForm это не прослушиватель события, это проп который идет на мой компонент формы */}
        {/* <Form onSubmitForm={this.formSubmitHandler} /> */}
        {/* <Form onSubmitForm={this.formSubmitHandler} /> */}
        <div>
          <TodoEditor onSubmit={this.addTodo} />
          <p>Total Todo: {totalTodoCount}</p>
          <p>Number of completed Todo: {completedTodoCount}</p>
        </div>

        <Filter valueFilter={filter} onChangeFilter={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onToggleCompleted={this.toggleComplited}
          onDeleteTodo={this.deleteTodo}
        />
      </Container>
    );
  }
}

export default App;
