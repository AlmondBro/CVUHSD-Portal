import React, { Component } from 'react';
import Modal from 'react-modal';

import isDev from "isdev";

//import { Form, FormInputTextField, FormButton } from './ChangePassword_StyledComponents.js';

import ReactLoading from 'react-loading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser as user, faLock as lock } from '@fortawesome/free-solid-svg-icons';

import { ChangePassword_IFrame, Form, FormHeader, FormInput, FormButton, FormInputLabel, ResetButton, PortalLogo, 
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
        position              : "relative",
        height                : "73%",
        width                 : "65%",
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
        body: JSON.stringify({username: this.state.userName, password: this.state.password, newPassword: this.state.newPassword})
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
      userCheck = false;
    }

    if (newPassword.toString().trim().length < 14) {
      this.setState({isLoading: false, message: "New password must be at least 14 characters."})
      userCheck = false;
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
      console.log("Changing password...");
      this.modifyChangePasswordSuccess(true);

    } else {
      this.modifyChangePasswordSuccess(false);
      console.log("Password...");

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
        
          <ChangePassword_CloseButton 
            className="change-password-close-button"
            onClick={this.closeModal}
          >
            &times;
          </ChangePassword_CloseButton>

          <ChangePassword_FormHeader className="changePasswordForm-header">
              {/* <CVUHSDLogo src="/images/CV-600x600.png" alt="CVUHSD" /> */}
              <FormHeaderText className="form-header-text">Change Password</FormHeaderText>
          </ChangePassword_FormHeader>

          <ChangePassword_IFrame 
            src="https://sso.centinela.k12.ca.us/adfs/portal/updatepassword"
          />
        </Modal>
      </div>
    );
  }; //end render() method
 
}; //end ChangePassword class

export default ChangePassword;