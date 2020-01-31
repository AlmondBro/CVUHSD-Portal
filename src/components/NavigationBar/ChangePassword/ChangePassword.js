import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalisOpen: false
    }; //end this.state variable
  } //end constructor()

  openModal = () => {
    this.setState({
      modalIsOpen: true
    }); //end this.setState()
  }; //end openModal

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }; //end afterOpenModal

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    }); //end this.setState()
  }; //end closeModal

  render = () => {
    return (
      <div id="changePassword-modal">
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }; //end render() method
 
}; //end ChangePassword class

export default ChangePassword;