import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');
// console.log(modalRoot);

class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');

    window.addEventListener('keydown', e => {
      console.log(e.code);
      if (e.code === 'Escape') {
        this.props.onCloseModal();
      }
    });
  }

  componentDidUpdate() {
    // console.log('Modal componentDidUpdate');
  }

  render() {
    return createPortal(
      <div className="Modal__backdrop">
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
