import React, { Component } from 'react';
import shortid from 'shortid';
import Container from './Components/Container/Container';
import Form from './Components/Form';
import TodoEditor from './Components/TodoEditor';
import Filter from './Components/Filter/Filter';
import TodoList from './Components/TodoList';
import Modal from './Components/Modal';
import Clock from './Components/Clock';
import Tabs from './Components/Tabs';
import IconButton from './Components/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';
// import initialTodos from './todos.json';
import tabs from './tabs.json';
// import './App.css';

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  // Монтирование компонента первый раз не публичное свойство класса
  componentDidMount() {
    // console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    const parceTodos = JSON.parse(todos);

    if (parceTodos) {
      this.setState({ todos: parceTodos });
    }
  }

  // обновление компонента кадый раз при получении пропса или изменении стейта
  componentDidUpdate(prevProps, prevState) {
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    // console.log('App componentDidUpdate ');
    if (nextTodos !== prevTodos) {
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    // проверка длины массива Todos для закрытия модалки после создания новой Todo
    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
    // console.log(prevState);
    // console.log(this.state);
  }

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

    // this.toggleModal();
  };

  // data - {name, tag} из стейта формы
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

  // method update Todo on click checkbox ==========================
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
  // ===================================================
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

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    // console.log('App render');

    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;

    const completedTodoCount = this.calculateCompletedTodoCount();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        {/* onSubmitForm это не прослушиватель события, это проп который идет на мой компонент формы */}
        <Form onSubmitForm={this.formSubmitHandler} />
        <Form onSubmitForm={this.formSubmitHandler} />

        <div>
          <h1>Todo List</h1>
          <IconButton onClick={this.toggleModal} aria-label="Add Todo">
            <AddIcon width="40" height="40" fill="white" />
          </IconButton>
          <p>Total Todo: {totalTodoCount}</p>
          <p>Number of completed Todo: {completedTodoCount}</p>
        </div>

        <Filter valueFilter={filter} onChangeFilter={this.changeFilter} />

        {/* <button type="button" onClick={this.toggleModal}>
          Open modal
        </button> */}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
            {/* <h1>Modal text</h1>
            <p>
              Commodo irure qui eu ex ipsum reprehenderit quis sunt sint
              occaecat dolor amet sunt. Esse sunt elit adipisicing adipisicing
              sunt tempor est anim aliquip.
            </p> */}
            <Clock />
            {/* <button type="button" onClick={this.toggleModal}>
              Close modal
            </button> */}
          </Modal>
        )}

        <TodoList
          todos={visibleTodos}
          onToggleCompleted={this.toggleComplited}
          onDeleteTodo={this.deleteTodo}
        />

        <Tabs items={tabs} />
      </Container>
    );
  }
}

export default App;
