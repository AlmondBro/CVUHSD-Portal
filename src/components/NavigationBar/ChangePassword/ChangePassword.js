import React, { Component } from 'react';
import Modal from 'react-modal';

import { Form, FormInputTextField, FormButton } from './ChangePassword_StyledComponents.js';

import { FormInputLabel, FormInput } from './../../LogIn/LogIn_StyledComponents.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser as user, faLock as lock } from '@fortawesome/free-solid-svg-icons';
class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(30,108,147, 0.55)',
          // ( (props.districtPosition !== "student") 
          //     || !props.location.state.renderAsStudent ) ? 
          //       "#1E6C93": "#931E1D",
      
       
        zIndex: 3
      },
    
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    this.state = {
      modalisOpen: false
    }; //end this.state variable
  } //end constructor()

  openModal = () => {
    // this.setState({
    //   modalIsOpen: true
    // }); //end this.setState()
    this.props.toggleModal(true);
  }; //end openModal


  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }; //end afterOpenModal

  closeModal = () => {
    // this.setState({
    //   modalIsOpen: false
    // }); //end this.setState()
    this.props.toggleModal(false);
  }; //end closeModal

  componentDidMount = () => {
    console.log(`Change password props:\t ${JSON.stringify(this.props)}`);
  }

  render = () => {
    return (
      <div id="changePassword-modal">
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={() => this.closeModal() }
          style={this.customStyles}
          contentLabel="Change Password"
          closeTimeoutMS={700}
        >

          {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
          <FormButton onClick={this.closeModal}>x</FormButton>
          <Form>
            {/* <FormInputTextField type="text" placeholder="current password"/>
            <FormInputTextField type="text" />
            
            <FormButton type="submit">Change Password</FormButton> */}
              <FormInputLabel htmlFor="password">
                            <FontAwesomeIcon icon={lock} className="icon"/> 
                        </FormInputLabel>
                        <FormInput 
                            type="password" 
                            name="password" 
                            id="password"
                            title="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                            placeholder="CVUHSD Password"
                        />
          </Form>
        </Modal>
      </div>
    );
  }; //end render() method
 
}; //end ChangePassword class

export default ChangePassword;