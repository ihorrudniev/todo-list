import React, { Component } from 'react';
import shortid from 'shortid';

class Form extends Component {
  // этот стейт внутри формы, он нужен чтоб пока мы что-то набираем обновлять интерфейс (перерисовывать инпуты)
  state = {
    // inputValue: ' ', - /**это был пример */
    name: '',
    tag: '',
    experience: 'junior',
    contract: false,
  };
  // ====если необходимо связывать <label> and <input> используем уникальные идентификаторы генерируя их динамически
  nameInputId = shortid.generate();
  tagInputId = shortid.generate();

  // handleNameChange = event => {
  //   this.setState({ name: event.currentTarget.value });
  //    console.log(event.currentTarget.value);
  //   записываем в state => currentTarget.value поверх того что было, не основываясь на предыдущем значении
  // };

  // handleLastNameChange = event => {
  //   this.setState({ lastName: event.currentTarget.value });
  //   console.log(event.currentTarget.value);
  //   записываем в state => currentTarget.value поверх того что было, не основываясь на предыдущем значении
  // };

  // =======  use one handler for two inputs  =====
  handleChange = event => {
    const { name, value } = event.currentTarget;
    // console.log(event.currentTarget);
    // console.log(event.currentTarget.name);
    // console.log(event.currentTarget.value);

    // example
    // const a = 'qweqwe';
    // this.setState({ [a]: 5 });
    // {
    //   qweqwe: 5;
    // }
    this.setState({
      [name]: value,
    });
  };

  // =====method submit form =======
  handleSubmit = event => {
    event.preventDefault(); /**not to reload the page */
    this.props.onSubmitForm(this.state);

    this.reset();
    // console.log(this.state);
  };

  handleContractChange = event => {
    console.log(event.currentTarget.checked);
    this.setState({ contract: event.currentTarget.checked });
  };

  // ===== сброс данных в инпутах поcле отправки формы ======
  reset = () => {
    this.setState({ name: '', tag: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <input type="text" value={this.state.inputValue} onChange={this.handleInputChange}/>  - это был пример */}
        <label htmlFor={this.nameInputId}>
          Name
          <input
            type="text"
            name="name" /**значение атрибута такое как в state */
            value={this.state.name}
            // onChange={this.handleNameChange}
            onChange={this.handleChange}
            id={this.nameInputId}
          />
        </label>
        <label htmlFor={this.tagInputId}>
          Last Name
          <input
            type="text"
            name="tag" /**значение атрибута такое как в state */
            value={this.state.tag}
            // onChange={this.handleLastNameChange}
            onChange={this.handleChange}
            id={this.tagInputId}
          />
        </label>

        <p>Your level:</p>

        <label>
          <input
            type="radio"
            name="experience"
            value="junior"
            onChange={this.handleChange}
            checked={this.state.experience === 'junior'}
          />
          Junior
        </label>
        <label>
          <input
            type="radio"
            name="experience"
            value="middle"
            onChange={this.handleChange}
            checked={this.state.experience === 'middle'}
          />
          Middle
        </label>
        <label>
          <input
            type="radio"
            name="experience"
            value="senior"
            onChange={this.handleChange}
            checked={this.state.experience === 'senior'}
          />
          Senior
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="contract"
            id=""
            checked={this.state.contract}
            onChange={this.handleContractChange}
          />
          I agree with the terms of the contract
        </label>
        <br />

        <button type="submit" disabled={!this.state.contract}>
          Send
        </button>
      </form>
    );
  }
}

export default Form;
