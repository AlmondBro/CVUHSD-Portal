import React, { Component } from 'react';
import Modal from 'react-modal';

//import { Form, FormInputTextField, FormButton } from './ChangePassword_StyledComponents.js';

import ReactLoading from 'react-loading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser as user, faLock as lock } from '@fortawesome/free-solid-svg-icons';

import { Form, FormHeader, FormInput, FormButton, FormInputLabel, ResetButton, PortalLogo, 
        CVUHSDLogo, ResultButton, ErrorTextAlert, FormHeaderText, ResultMessage, IPAddress, 
        IPLoadingContainer, StyledLoadingContainer, LoadingSpinner } from "./../../LogIn/LogIn_StyledComponents.js";
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
          <Form action="/login" method="post" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>
                        <FormHeader>
                            <CVUHSDLogo src="/images/CV-600x600.png" alt="CVUHSD" />
                            <FormHeaderText>Login</FormHeaderText>
                        </FormHeader>
                    </legend>
                    <p className="cvuhsd-username-container input-icons">
                        <FormInputLabel htmlFor="username">
                            <FontAwesomeIcon icon={user} className="icon"/> 
                        </FormInputLabel>
                        <FormInput 
                            className="input-field"
                            type="text" 
                            name="username" 
                            id="username"
                            title="username"
                            onChange={this.handleInputChange}
                            value={this.state.username}
                            placeholder="CVUHSD Username"
                        />
                    </p>
                    <p className="cvuhsd-password-container input-icons">
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
                    </p>
                    <p className="form-buttons-container">
                         {
                            /*  &#10003; -- checkmark 
                            &#215; -- close
                            //TODO: Need to find HTML entities
                            */
                        }
                        <FormButton type="submit" title="Log In">Submit</FormButton>
                        { this.state.loggedIn === null ? "" : 
                            (  <ResetButton id="reset-button"
                                            type="reset"
                                            title="Reset form"
                                >
                                    Reset
                                </ResetButton>  
                            )
                        }
                        {   this.state.isLoading ?
                                <LoadingSpinner 
                                    type={"spin"}
                                    height={'30px'} width={'30px'} 
                                    color={'#1f6b92'}
                                /> : "" 
                        }
                        { (this.state.loggedIn === null) ? null : 
                            (   <div>
                                    <ResultButton   
                                        id="result-button" 
                                        title="Reset form" 
                                        loggedIn={this.state.loggedIn}
                                    > 
                                        { (this.state.loggedIn) ? "✓" : "×"}
                                    </ResultButton> 
                                    <ErrorTextAlert>
                                        { (this.state.loggedIn != false) ? null : "Error:"}
                                    </ErrorTextAlert>
                                </div>
                              
                            )

                        }
                        <ResultMessage loggedIn={this.state.loggedIn}>{"\t" + this.state.message}</ResultMessage>
                    </p>
                </fieldset>
            </Form>
        </Modal>
      </div>
    );
  }; //end render() method
 
}; //end ChangePassword class

export default ChangePassword;