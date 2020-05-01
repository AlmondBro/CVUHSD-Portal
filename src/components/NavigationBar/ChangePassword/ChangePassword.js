import React, { Component } from "react";

//Import 3rd-pary modules
import Modal from "react-modal";
import isDev from "isdev";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as user, faLock as lock } from '@fortawesome/free-solid-svg-icons';

//Import utility functions
import { isEmpty } from "./../../../utilityFunctions.js";

//Import form components
import { Form, FormHeader, FormInput, FormButton, FormInputLabel, ResetButton, PortalLogo, 
        CVUHSDLogo, ResultButton, ErrorTextAlert, FormHeaderText, ResultMessage, IPAddress, 
        IPLoadingContainer, StyledLoadingContainer, LoadingSpinner,

        ChangePassword_FormInput, ChangePassword_SubmitResetButtonsContainer, ChangePassword_FormButton, ChangePassword_ResetButton, ChangePassword_CloseButton, ChangePassword_Form, ChangePassword_FormHeader, ChangePassword_Divider
      } from "./ChangePassword_StyledComponents";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalisOpen: false,
      changePasswordSuccess: null,
      isLoading: null,
      userName: "",
      password: "",
      newPassword: "",
      message: "",
      modalBGColor: "rgba(30, 108, 147, 0.65)"
      //red: rgba(147, 30, 29, 0.65)
    }; //end this.state variable

    this.customStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: this.state.modalBGColor,
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
    }; //end customStyles{} 
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
  }; //end componentDidMount()

  componentDidUpdate = (prevProps) => {
    console.log("componentDidUpdate");
    // districtPosition={props.districtPosition}
    // renderAsStudent={props.renderAsStudent}

    if (this.props.districtPosition != prevProps.districtPosition) {
      console.group("componentDidUpdate update");
      let modalBGColor = (this.props.districtPosition === "Student" || this.props.renderAsStudent) ? 
                            "rgba(147, 30, 29, 0.65)" : "rgba(30, 108, 147, 0.65)";
      this.setState({modalBGColor: modalBGColor});
    }
  }; //end componentDidUpdate()

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
}; //end validateFields()

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
      
  }; //end handleSubmit()

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
        [name] : value
    });
  }; //end handleInputChange()

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
            className="changePassword-close-button" 
            districtPosition={this.props.districtPosition}
            renderAsStudent={this.props.renderAsStudent}
            onClick={this.closeModal}
          >
            &times;
          </ChangePassword_CloseButton>

          {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
          
          <ChangePassword_Form 
              className="changePassword-form"
              districtPosition={this.props.districtPosition}
              renderAsStudent={this.props.renderAsStudent}
              action="/change-password" 
              method="POST" 
              onSubmit={this.handleSubmit}
            >
                <fieldset>
                    <legend>
                        <ChangePassword_FormHeader className="changePassword-form-header">
                            {/* <CVUHSDLogo src="/images/CV-600x600.png" alt="CVUHSD" /> */}
                            <FormHeaderText className="changePassword-form-header-text">Change Password</FormHeaderText>
                        </ChangePassword_FormHeader>
                    </legend>
                    <p className="cvuhsd-username-container input-icons">
                        <FormInputLabel 
                          htmlFor="username" 
                          className="formInput-label"
                          districtPosition={this.props.districtPosition}
                          renderAsStudent={this.props.renderAsStudent}
                        >
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
                        <FormInputLabel 
                          htmlFor="password"
                          districtPosition={this.props.districtPosition}
                          renderAsStudent={this.props.renderAsStudent}
                        >
                            <FontAwesomeIcon icon={lock} className="icon"/> 
                        </FormInputLabel>
                        <ChangePassword_FormInput 
                            className="form-input"
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
                      <FormInputLabel 
                          className="form-input-label"
                          htmlFor="password"
                          districtPosition={this.props.districtPosition}
                          renderAsStudent={this.props.renderAsStudent}
                        >
                            <FontAwesomeIcon icon={lock} className="icon"/> 
                        </FormInputLabel>
                        <ChangePassword_FormInput 
                            className="form-input"
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
                        <FormInputLabel 
                          className="form-input-label"
                          htmlFor="password"
                          districtPosition={this.props.districtPosition}
                          renderAsStudent={this.props.renderAsStudent}
                        >
                            <FontAwesomeIcon icon={lock} className="icon"/> 
                        </FormInputLabel>
                        <ChangePassword_FormInput 
                            className="form-input"
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
                          title="Change Password"
                          districtPosition={this.props.districtPosition}
                          renderAsStudent={this.props.renderAsStudent}
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