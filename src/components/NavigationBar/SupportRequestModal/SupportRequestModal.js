import React, { useState, useEffect } from 'react';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';

import isDev from 'isdev';
import ReactLoading from 'react-loading';

import { 
    ModalTextInputField, SelectInputField, 
    TransferToITModalContainer, CloseButton, Form, ModalTitle, SubmitButton, FAIconStyled, TransferResultMessage, NoCVTechsMessage } from './SupportRequestModalStyledComponents.js';


const SupportRequestModal = ({ districtPosition, fullName, email, site, toggleModal, modalIsOpen, itUID }) => {
    let [ isLoading, setIsLoading ]     = useState(false);

    let [ categories, setCategories ]   = useState([]);
    let [ locations, setLocations ]     = useState([]);

    let [ isRequestSuccessful, setIsRequestSuccessful ] = useState(null);

    const [ formField, setFormField ] = useState({
        supportRequestTitle :   "",
        category            :   "",
        description         :   "",
        location            :   "",
        phoneExt            :   "",
        room                :   "",
        attachment          :   "",
    });

  var subtitle;

  const onChange = (event) => {
    setFormField( { ...formField, [ event.target.name ] : event.target.value });
  }; //end onChange() handler


  const afterOpenModal = async () => {
      console.log("<TransferToITModal/>afterOpenModal()");
      console.log("<TransferToITModal/>afterOpenModal() itUID:\t", itUID);

      setIsLoading(false);
  }; //afterOpenModal()

  const submitRequest = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    alert(JSON.stringify(formField));

    let {     
        supportRequestTitle,
        category,
        description,
        location,
        phoneExt,
        room,
        attachment 
    } = formField;

    let supportReqDetails = {
        fullName,
        email,
        supportRequestTitle,
        category,
        description,
        location,
        phoneExt,
        room
    }

    const submitRequest_URL = `${isDev ? "" : "/server"}/helpdesk/request/create`;
    const submitRequest_headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": true
    };

    let submitReqResponse = await fetch(submitRequest_URL, {
        method: 'POST',
        headers: submitRequest_headers,
        body: JSON.stringify({ ...supportReqDetails} )
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse)
    .catch((error) => {
        console.error(`Catching error:\t ${error}`);
    });

    window.alert(JSON.stringify(submitReqResponse));

    if (submitReqResponse) {
        const responseStatus = submitReqResponse["response_status"].status;

        setIsLoading(false);

        alert("responseStatus:\t", responseStatus);

        if (responseStatus === "success") {
            setIsRequestSuccessful(true);

            //Reset the form field after submitting.
            setFormField({
                supportRequestTitle :   "",
                category            :   "",
                description         :   "",
                location            :   "",
                phoneExt            :   "",
                room                :   "",
                attachment          :   "",
            });
        } else {
            setIsRequestSuccessful(false);
        }

    }

    return submitReqResponse;
  }; //end submitRequest

  const bodyOpenClassName="transfer-to-it-modal-body--open",
        htmlOpenClassName="transfer-to-it-modal-html--open",
        overlayClassName="transfer-to-it-modal-overlay",
        portalClassName="transfer-to-it-modal",
        contentClassName="transfer-to-it-modal-content",
        parentSelectorID="chat-page-main-container";

  let {     
        supportRequestTitle,
        category,
        description,
        location,
        phoneExt,
        room,
        attachment 
    } = formField;

    const categoriesList =  [   "Computer Issue", "Printer Issue", "Projector Issue", "Password Issue", 
                                "Canvas", "PowerSchool", "Illuminate", "Google", "Wi-fi Issue", 
                                "Eno Pen -- Board", "Software Installation", "Student Chromebook",
                                "Phone Issue", "Other"
                            ];

    const locationsList =   (districtPosition.toLowerCase() === "student") ? [ site.toString() ] :
                                [   "Lawndale High School", "Leuzinger High School", "Hawthorne High School", 
                                    "District Office", "Lloyde High School", "CV Independent Study", "Adult Ed", 
                                    "Service Center"
                                ];


    useEffect(() => {
        setCategories(categoriesList);
        setLocations(locationsList);
    }, [ site ]); //end useEffect()

    const onClose = () => {
        setIsRequestSuccessful(null);
        toggleModal(false);
    }; //end onClose

  return (
      <TransferToITModalContainer
        isOpen                      =   { modalIsOpen }
        onAfterOpen                 =   { afterOpenModal }
        onRequestClose              =   { onClose }

        contentLabel                =   { "Transfer to IT Modal" }
        portalClassName             =   { portalClassName }
        overlayClassName            =   { overlayClassName }
        className                   =   { contentClassName }
        bodyOpenClassName           =   { bodyOpenClassName }
        htmlOpenClassName           =   "transfer-to-it-modal-html--open"
        
        // parentSelector           =   { () => document.getElementById(parentSelectorID)}

        shouldCloseOnOverlayClick   =   { false }
        closeTimeoutMS              =   { 300 }
      >
        <CloseButton 
            title   =   "Close modal"
            onClick =   { () => toggleModal(false) } 

        >
            &times;
        </CloseButton>
        <Form onSubmit={ submitRequest }>
            <label htmlFor="it-transfer-select">
                <ModalTitle ref={_subtitle => (subtitle = _subtitle)}>Tech Support Request</ModalTitle>
                <FAIconStyled
                    icon    =   { faLaptop }
                />
            </label>

            <ModalTextInputField
                name        =   "supportRequestTitle"
                title       =   "Title:" 
                inputType   =   "text"
                placeholder =   "Support Request Title"
                
                onChange    =   { onChange }   
                value       =   { supportRequestTitle }

                required
            />
            <SelectInputField
                name        =   "category" 
                title       =   { "Category:" }
                
                options     =   { categories }

                onChange    =   { onChange }  
                value       =   {  category }
            />

            <ModalTextInputField
                name        =   "description"
                title       =   "Description:" 
                inputType   =   "text"
                placeholder =   "What is the issue at hand?"
                
                onChange    =   { onChange }  
                value       =   { description }
                required
                textArea
                
            />

            <SelectInputField 
                name        =   "location"
                title       =   "Location:" 

                options     =   { locations }
                value       =   { location  }
                onChange    =   { onChange  }

            />
            
            <ModalTextInputField
                name        =   "phoneExt"
                title       =   "Phone Ext./ Number:" 
                inputType   =   "tel"
                placeholder =   "A telephone/cell number to reach you by (no parentheses). Leave extension if staff member. "

                value       =   { phoneExt }
                onChange    =   { onChange }  
            />

            <ModalTextInputField
                name        =   "room"
                title       =   "Office/ Room Number:" 
                inputType   =   "text"
                placeholder =   "Your location"

                value       =   { room }
                onChange    =   { onChange }
            />
            <SubmitButton 
                type    =   "submit"
            >
                {
                    isLoading ? (
                        <ReactLoading 
                            type    =   "bubbles"
                            width   =   "30px" 
                            height  =   "30px" 
                            color   =   "white"
                        /> ) : "Submit Request"
                }
            </SubmitButton>
        </Form>

        <TransferResultMessage className="transfer-result-message">
          {
            (isRequestSuccessful === null) ? null :
              ( (isRequestSuccessful === true) ? "Success! Submitted Request \u2714" : 
                  "Submitting request failed \u00D7" 
              )
          }
        </TransferResultMessage>
      </TransferToITModalContainer>
  ); //end return statement
}; //end TransferToITModal()

export default SupportRequestModal;