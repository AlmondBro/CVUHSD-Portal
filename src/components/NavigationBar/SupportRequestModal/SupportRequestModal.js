import React, { useState, useEffect } from 'react';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';

import { 
    ModalTextInputField, SelectInputField, 
    TransferToITModalContainer, CloseButton, Form, ModalTitle, SubmitButton, FAIconStyled, TransferResultMessage, NoCVTechsMessage } from './SupportRequestModalStyledComponents.js';


const SupportRequestModal = ({ toggleModal, modalIsOpen, itUID }) => {
    let [ isLoading, setIsLoading ] = useState(false);

    let [ categories, setCategories ] = useState([]);
    let [ locations, setLocations ] = useState([]);

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

    alert(JSON.stringify(formField));
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

    const locationsList =   [   "Lawndale", "Leuzinger", "Hawthorne", "District Office", "Lloyde", 
                                "CVISS", "Adult Ed", "Service Center"
                            ];


    useEffect(() => {
        setCategories(categoriesList);
        setLocations(locationsList);
    }, []); //end useEffect()

  return (
      <TransferToITModalContainer
        isOpen                      =   { modalIsOpen }
        onAfterOpen                 =   { afterOpenModal }
        onRequestClose              =   { () => toggleModal(false) }

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
                name        = "location"
                title       = "Location:" 

                options     =   { locations }
                value       =   { location  }
                onChange    =   { onChange  }

            />
            
            <ModalTextInputField
                name        =   "phoneExt"
                title       =   "Phone Ext./ Number:" 
                inputType   =   "number"
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
                Submit Request
            </SubmitButton>
        </Form>

        <TransferResultMessage className="transfer-result-message">
          {
            (isRequestSuccessful !== null) ?
              ( (isRequestSuccessful === true) ? "Transfer successful \u2714" : 
                  "Could not complete transfer \u00D7" 
              )
              : null
          }
        </TransferResultMessage>
      </TransferToITModalContainer>
  ); //end return statement
}; //end TransferToITModal()

export default SupportRequestModal;