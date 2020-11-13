import React, { useState, useEffect, createRef, useRef } from 'react';
import { faLock, faTicketAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';

import isDev from 'isdev';
import ReactLoading from 'react-loading';

import { 
    ModalTextInputField, SelectInputField, HelpdeskSubmitMessage,
    ChangePasswordModalContainer, CloseButton, Form, ModalTitle, SubmitButton, FAIconStyled, TransferResultMessage, NoCVTechsMessage } from './ChangePasswordStyledComponents.js';
import { create } from 'ssl-root-cas/ssl-root-cas-latest';

const ChangePasswordModal = ({ districtPosition, fullName, email, site, toggleModal, modalIsOpen, itUID, notify }) => {
    let [ isLoading, setIsLoading ]                         = useState(false);
    let [ changePasswordResult, setChangePasswordResult ]   = useState(null);

    let [ serverMessage, setServerMessage ]                 = useState("");

    let [ submitEnabled, setSubmitEnabled ]                 = useState(false);

    const [ formField, setFormField ]                       = useState({
                                                                    currentPassword         :   "",
                                                                    confirmNewPassword  :   "",
                                                                    newPassword         :   ""
                                                                });

    var formFieldRef                                        = useRef({});


  const onChange = (event) => {
    setFormField( { ...formField, [ event.target.name ] : event.target.value });
  }; //end onChange() handler


  const afterOpenModal = async () => {
      setSubmitEnabled(true);
      setIsLoading(false);
      setServerMessage("");
   
      formFieldRef.current['currentPassword'].focus(); //focus the first form field element
  }; //afterOpenModal()

  const onClose = () => {
    setChangePasswordResult(null);
    setServerMessage("");
    toggleModal(false);

    setFormField({
        currentPassword         :   "",
        confirmNewPassword  :   "",
        newPassword         :   ""
    });
    }; //end onClose()

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    let changePasswordServerResponse = "";
    ///*
    if (submitEnabled && (isLoading === false) ) {

        setIsLoading(true);
        setSubmitEnabled(false);

        if (newPassword.length >= 14 ) {
            if (newPassword === confirmNewPassword) {
                let {     
                    currentPassword,       
                    confirmNewPassword,
                    newPassword 
                } = formField;
        
                let username = email.split('@')[0];
            
                const changePassword_URL = `${isDev ? "" : "/server"}/user-ops/password/update`;
                const changePassword_headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials": true
                };
            
                changePasswordServerResponse = await fetch(changePassword_URL, {
                    method: 'PUT',
                    headers: changePassword_headers,
                    body: JSON.stringify({...formField, username})
                })
                .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
                .then((jsonResponse) => jsonResponse)
                .catch((error) => {
                    console.error(`Catching error:\t ${error}`);
                });
            
        
                console.log("changePasswordServerResponse", changePasswordServerResponse);
        
                if (changePasswordServerResponse) {
        
                    let { message, error } = changePasswordServerResponse;
        
                    setServerMessage(message);
        
                    setIsLoading(false);
        
                    if (error === false) {
                        setChangePasswordResult(true);
            
                        setTimeout(() => {
                            //Reset the form field after submitting.
            
                            toggleModal(false);
                            
                            setFormField({
                                currentPassword         :   "",
                                confirmNewPassword  :   "",
                                newPassword         :   ""
                            });
                        }, 800);
                
                    } else {
                        setChangePasswordResult(false);
                        setSubmitEnabled(true);
                    } //end inner-else statment
                } //end if-statement
            } else {
                setChangePasswordResult(false);
                setServerMessage("New password and confirmation do not match");

                setIsLoading(false);
                setSubmitEnabled(true);
                return;
            } //end else if the password does not match
        } else {
            setChangePasswordResult(false);
            setServerMessage("New password must be at least 14 characters long");

            setIsLoading(false);
            setSubmitEnabled(true);
            return;
        } //end else-statement
     
     
    } else{
        window.alert("Submitting duplicate tickets prohibited.");
        setServerMessage("Submitting duplicate tickets prohibited");
        notify(
            <HelpdeskSubmitMessage
                districtPosition    =   { districtPosition }
                message             =   "Submitting duplicate tickets prohibited"
                icon                =   { faWindowClose }
            />
        ); //end notify()
    } //end outer else-statement
    // */
 
    return changePasswordServerResponse;
  }; //end submitRequest

  const bodyOpenClassName="change-password-modal-body--open",
        htmlOpenClassName="change-password-modal-html--open",
        overlayClassName="change-password-modal-overlay",
        portalClassName="change-password-modal",
        contentClassName="change-password-modal-content",
        parentSelectorID="chat-page-main-container";

  let {     
        currentPassword,
        confirmNewPassword,
        newPassword         
    } = formField;

    
    useEffect(() => {

    }, [ site, districtPosition ]); //end useEffect()

  return (
      <ChangePasswordModalContainer
        isOpen                      =   { modalIsOpen }
        onAfterOpen                 =   { afterOpenModal }
        onAfterClose                =   { onClose }
        shouldCloseOnEsc            =   { true }
        shouldReturnFocusAfterClose =   { true }
        //onRequestClose              =   { onClose }

        contentLabel                =   { "Support Request Modal" }

        portalClassName             =   { portalClassName }
        overlayClassName            =   { overlayClassName }
        bodyOpenClassName           =   { bodyOpenClassName }
        htmlOpenClassName           =   "change-password-modal-html--open"
        className                   =   { contentClassName }

        
        parentSelector              =   { () => document.getElementById("cvuhsd-sso-portal")}

        shouldCloseOnOverlayClick   =   { false }
        closeTimeoutMS              =   { 300 }
      >
        <CloseButton 
            title               =   "Close modal"
            districtPosition    =   { districtPosition.toLowerCase() }
            onClick             =   { () => toggleModal(false) } 
        >
            &times;
        </CloseButton>
        <Form onSubmit={ onSubmit }>
            <label htmlFor="it-transfer-select">
                <ModalTitle 
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    Change Password
                </ModalTitle>
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    icon                =   { faLock }
                />
            </label>

            <ModalTextInputField
                name                =   "currentPassword"
                title               =   "Old Password:" 
                districtPosition    =   { districtPosition.toLowerCase() }
                inputType           =   "password"
                placeholder         =   "Old Password"
                
                onChange            =   { onChange }   
                value               =   { currentPassword }
                ref                 =   { element => formFieldRef.current['currentPassword'] = element } 

                isOfTypePassword
                required
            />

            <ModalTextInputField
                name                =   "newPassword"
                title               =   "New Password:" 
                districtPosition    =   { districtPosition.toLowerCase() }
                inputType           =   "password"
                placeholder         =   "New Password"
                
                onChange            =   { onChange }   
                value               =   { newPassword } 
                ref                 =   { element => formFieldRef.current['newPassword'] = element } 



                isOfTypePassword
                required
            />

            <ModalTextInputField
                name                =   "confirmNewPassword"
                title               =   "" 
                districtPosition    =   { districtPosition.toLowerCase() }
                inputType           =   "password"
                placeholder         =   "Confirm New Password"
                
                onChange            =   { onChange }   
                value               =   { confirmNewPassword }
                ref                 =   { element => formFieldRef.current['confirmNewPassword'] = element } 

                isOfTypePassword
                required
            />

            <SubmitButton 
                districtPosition    =   { districtPosition.toLowerCase() }
                disabled            =   { !submitEnabled }
                submitEnabled       =   {  submitEnabled }
                type                =   "submit"
            >
                {
                    isLoading ? (
                        <ReactLoading 
                            type    =   "bubbles"
                            width   =   "30px" 
                            height  =   "30px" 
                            color   =   "white"
                        /> ) : "Change Password"
                }
            </SubmitButton>
        </Form>

        <TransferResultMessage 
            className           =   "transfer-result-message"
            districtPosition    =   { districtPosition.toLowerCase() }
        >
          {
            (changePasswordResult === null) ? null :
            ( (changePasswordResult === true) ? `${serverMessage} \u2714` : 
                `${serverMessage} \u00D7` 
            )
          }
        </TransferResultMessage>
      </ChangePasswordModalContainer>
  ); //end return statement
}; //end TransferToITModal()

export default ChangePasswordModal;