import React, { useState, useEffect, createRef, useRef } from 'react';
import { faLock, faTicketAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';

import isDev from 'isdev';
import ReactLoading from 'react-loading';

import { 
    ModalTextInputField, SelectInputField, HelpdeskSubmitMessage,
    ChangePasswordModalContainer, CloseButton, Form, ModalTitle, SubmitButton, FAIconStyled, TransferResultMessage, NoCVTechsMessage } from './ChangePasswordStyledComponents.js';
import { create } from 'ssl-root-cas/ssl-root-cas-latest';

const ChangePasswordModal = ({ districtPosition, fullName, email, site, toggleModal, modalIsOpen, itUID, notify }) => {
    let [ isLoading, setIsLoading ]     = useState(false);

    let [ categories, setCategories ]   = useState([]);
    let [ locations, setLocations ]     = useState([]);

    let [ isRequestSuccessful, setIsRequestSuccessful ] = useState(null);

    let [ submitEnabled, setSubmitEnabled ] = useState(false);

    const [ formField, setFormField ] = useState({
        oldPassword         :   "",
        confirmNewPassword  :   "",
        newPassword         :   ""
    });

  var formFieldRef = useRef({});

  let oldPasswordRef, confirmNewPasswordRef, newPassswordRef = useRef();


  const onChange = (event) => {
    setFormField( { ...formField, [ event.target.name ] : event.target.value });
  }; //end onChange() handler


  const afterOpenModal = async () => {
      setSubmitEnabled(true);
      setIsLoading(false);
   
      formFieldRef.current['oldPassword'].focus(); //focus the first form field element
  }; //afterOpenModal()

  const onClose = () => {
    setIsRequestSuccessful(null);
    toggleModal(false);

    setFormField({
        oldPassword         :   "",
        confirmNewPassword  :   "",
        newPassword         :   ""
    });
    }; //end onClose()

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    let changePasswordServerResponse = "";

    window.alert(JSON.stringify(formField));
    ///*
    if (submitEnabled && (isLoading === false) ) {

        window.alert("changing password");
        setIsLoading(true);

        // window.alert(JSON.stringify(formField));
    
        setSubmitEnabled(false);

        let {     
            oldPassword,       
            confirmNewPassword,
            newPassword 
        } = formField;
    
        const changePassword_URL = `${isDev ? "" : "/server"}/user-ops/password/update`;
        const changePassword_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": true
        };
    
        changePasswordServerResponse = await fetch(changePassword_URL, {
            method: 'POST',
            headers: changePassword_headers,
            body: JSON.stringify({...formField, email})
        })
        .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
        .then((jsonResponse) => jsonResponse)
        .catch((error) => {
            console.error(`Catching error:\t ${error}`);
        });
    
        //window.alert(JSON.stringify(submitReqResponse));
    
        console.log("changePasswordServerResponse", changePasswordServerResponse);

        if (changePasswordServerResponse) {
            setIsLoading(false);

            if (changePasswordServerResponse.status === "success") {
    
                setIsRequestSuccessful(true);
    
                setTimeout(() => {
                         //Reset the form field after submitting.
    
                    toggleModal(false);
                    
                    setFormField({
                        oldPassword         :   "",
                        confirmNewPassword  :   "",
                        newPassword         :   ""
                    });
                }, 800);
           
            } else {
                setIsRequestSuccessful(false);
            }
    
        }
    } else{
        window.alert("Submitting duplicate tickets prohibited.");
        notify(
            <HelpdeskSubmitMessage
                districtPosition    =   { districtPosition }
                message             =   "Submitting duplicate tickets prohibited"
                icon                =   { faWindowClose }
            />
    );
    }
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
        oldPassword,
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
                name                =   "oldPassword"
                title               =   "Old Password:" 
                districtPosition    =   { districtPosition.toLowerCase() }
                inputType           =   "password"
                placeholder         =   "Old Password"
                
                onChange            =   { onChange }   
                value               =   { oldPassword }
                ref                 =   { element => formFieldRef.current['oldPassword'] = element } 

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
            (isRequestSuccessful === null) ? null :
              ( (isRequestSuccessful === true) ? "Success! Password Changed \u2714" : 
                  "Changing password failed \u00D7" 
              )
          }
        </TransferResultMessage>
      </ChangePasswordModalContainer>
  ); //end return statement
}; //end TransferToITModal()

export default ChangePasswordModal;