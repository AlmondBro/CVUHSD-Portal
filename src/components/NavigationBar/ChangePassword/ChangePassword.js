import React, { Component } from 'react';
import Modal from 'react-modal';

import isDev from "isdev";

//import { Form, FormInputTextField, FormButton } from './ChangePassword_StyledComponents.js';

import ReactLoading from 'react-loading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser as user, faLock as lock } from '@fortawesome/free-solid-svg-icons';

import { Form, FormHeader, FormInput, FormButton, FormInputLabel, ResetButton, PortalLogo, 
        CVUHSDLogo, ResultButton, ErrorTextAlert, FormHeaderText, ResultMessage, IPAddress, 
        IPLoadingContainer, StyledLoadingContainer, LoadingSpinner,

        ChangePassword_FormInput, ChangePassword_SubmitResetButtonsContainer, ChangePassword_FormButton, ChangePassword_ResetButton, ChangePassword_CloseButton, ChangePassword_Form, ChangePassword_FormHeader, ChangePassword_Divider
      } from "./ChangePassword_StyledComponents";


import { isEmpty } from "./../../../utilityFunctions.js";


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
        backgroundColor: 'rgba(30,108,147, 0.65)',
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
        transform             : 'translate(-50%, -50%)',
        padding               : 0,
        margin                : 0,
        backgroundColor       : 'transparent',   
        border                : 0,
        overflow              : 'visible'
      }
    };

    this.state = {
      modalisOpen: false,
      changePasswordSuccess: null,
      isLoading: null,
      userName: "",
      password: "",
      newPassword: "",
      message: ""
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

  modifyChangePasswordSuccess = (changePasswordSuccess) => {
    this.setState({changePasswordSuccess : changePasswordSuccess});
    this.setState({message: "Password change failed"});
  };

  changePassword = () => {
    let changePassword_URL = `${isDev ? "" : "/server" }/change-password`;

    let headers = {
      'Content-Type': 'application/json',
      'credentials': 'include',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    };
  
    //this.setState({username: this.state.usernameOnly});
    console.log(`this.user_name_only (from connect to server): ${this.user_name_only}`);
    console.log(`Username: ${this.state.username}`);
    
    fetch(changePassword_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({username: this.state.userName, password: this.state.password})
    }).then((response) => {
      
    }).catch((err) => {
        this.modifyLogInStatus(false);
        this.setState(
                {
                    isLoading: false,
                    message: `Error: ${err}`
                }
        );
        console.log(`Catching error:\t ${err}`);
    });
  };

  
  validateFields = () => {
    console.log("checkUser() username");
    let { userName, password, newPassword} = this.state;

    let lowerCase_Username = userName.toLowerCase();

    let userCheck = false;

    console.log(`Is empty:\t ${isEmpty(" ")} ${isEmpty(userName)}`);

    console.log(`Is empty username and password:\t ${isEmpty(userName)} ${isEmpty(password)}`);

    if (isEmpty(userName) && isEmpty(password)) {
        this.modifyChangePasswordSuccess(false);

        console.log("Username and password are empty");
        this.setState({isLoading: false, message: "Please enter a username and password."});

        userCheck = false;
    }

    else if (isEmpty(password) && !isEmpty(userName) ) {
        this.modifyLogInStatus(false);
        console.log("Just password is empty.");
        this.setState({isLoading: false, message: "Please enter a password."})
        userCheck = false;
    }

    else if (!isEmpty(password) && isEmpty(userName) ) {
        this.modifyLogInStatus(false);
        console.log("Just username is empty.");
        this.setState({isLoading: false, message: "Please enter a username."})
        userCheck = false;
    } else {
        userCheck = true;
    }

    if (isEmpty(newPassword)) {
      this.modifyChangePasswordSuccess(false);
      this.setState({isLoading: false, message: "Please enter your new password."})
    }

   return userCheck;
};


  resetButtonListener = (event) => {
    this.modifyLogInStatus(null);
    this.setState({
        isLoading: false,
        userName: "",
        password: "",
        message: ""
    });
  } //end if-statement

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateFields() === true ) {
      this.changePassword();
    } else {
      this.modifyChangePasswordSuccess(false);
      return;
    }
      
  };

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
        [name] : value
    });
  };

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
        
          <ChangePassword_CloseButton onClick={this.closeModal}>
            &times;
          </ChangePassword_CloseButton>

          {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
          
          <ChangePassword_Form 
              action="/change-password" 
              method="POST" 
              onSubmit={this.handleSubmit}
            >
                <fieldset>
                    <legend>
                        <ChangePassword_FormHeader>
                            {/* <CVUHSDLogo src="/images/CV-600x600.png" alt="CVUHSD" /> */}
                            <FormHeaderText>Change Password</FormHeaderText>
                        </ChangePassword_FormHeader>
                    </legend>
                    <p className="cvuhsd-username-container input-icons">
                        <FormInputLabel htmlFor="username">
                            <FontAwesomeIcon icon={user} className="icon"/> 
                        </FormInputLabel>
                        <ChangePassword_FormInput 
                            className="input-field"
                            type="text" 
                            name="userName" 
                            id="userName"
                            title="userName"
                            onChange={this.handleInputChange}
                            value={this.state.userName}
                            placeholder="Your CVUHSD Username"
                        />
                    </p>
                    <p className="cvuhsd-password-container input-icons">
                        <FormInputLabel htmlFor="password">
                            <FontAwesomeIcon icon={lock} className="icon"/> 
                        </FormInputLabel>
                        <ChangePassword_FormInput 
                            type="password" 
                            name="password" 
                            id="password"
                            title="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                            placeholder="Current Password"
                        />
                    </p>
                    <ChangePassword_Divider/>
                    <p className="cvuhsd-password-container input-icons">
                        <FormInputLabel htmlFor="password">
                            <FontAwesomeIcon icon={lock} className="icon"/> 
                        </FormInputLabel>
                        <ChangePassword_FormInput 
                            type="password" 
                            name="newPassword" 
                            id="newPassword"
                            title="New Password"
                            onChange={this.handleInputChange}
                            value={this.state.newPassword}
                            placeholder="New Password"
                        />
                    </p>
                    <p className="cvuhsd-password-container input-icons">
                        <FormInputLabel htmlFor="password">
                            <FontAwesomeIcon icon={lock} className="icon"/> 
                        </FormInputLabel>
                        <ChangePassword_FormInput 
                            type="password" 
                            name="newPassword-confirm" 
                            id="newPassword-confirm"
                            title="Confirm New Password"
                            // onChange={this.handleInputChange}
                            // value={this.state.password}
                            placeholder="Confirm new password"
                        />
                    </p>


                    <ChangePassword_SubmitResetButtonsContainer className="form-buttons-container">
                         {
                            /*  &#10003; -- checkmark 
                            &#215; -- close
                            //TODO: Need to find HTML entities
                            */
                        }
                        <ChangePassword_FormButton 
                          type="submit" 
                          title="Log In"
                        >
                          Change Password
                        </ChangePassword_FormButton>
                        
                        <ChangePassword_ResetButton id="reset-button"
                                      type="reset"
                                      title="Reset form"
                          >
                              Reset
                          </ChangePassword_ResetButton>  
                            
                        {   this.state.isLoading ?
                                <LoadingSpinner 
                                    type={"spin"}
                                    height={'30px'} width={'30px'} 
                                    color={'#1f6b92'}
                                /> : "" 
                        }
                        { (this.state.changePasswordSuccess === null) ? null : 
                            (   <React.Fragment>
                                    <ErrorTextAlert>
                                        { (this.state.changePasswordSuccess != false) ? null : "Error:"}
                                    </ErrorTextAlert>
                                </React.Fragment>
                            )

                        }
                        
                        <ResultMessage 
                          loggedIn={this.state.loggedIn}
                        >
                          {"\t" + this.state.message}
                        </ResultMessage>
                    </ChangePassword_SubmitResetButtonsContainer>
                </fieldset>
            </ChangePassword_Form>
        </Modal>
      </div>
    );
  }; //end render() method
 
}; //end ChangePassword class

export default ChangePassword;