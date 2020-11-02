import React, { useState } from 'react';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';

import { 
    ModalTextInputField, SelectInputField, 
    TransferToITModalContainer, CloseButton, Form, ModalTitle, SubmitButton, FAIconStyled, TransferResultMessage, NoCVTechsMessage } from './SupportRequestModalStyledComponents.js';


const SupportRequestModal = ({ toggleModal, modalIsOpen, itUID }) => {
    let [ isLoading, setIsLoading ] = useState(false);
    let [ cvTechOptions, setCVTechOptions] = useState([]);

    let [ changedITUID, setChangedITUID ] = useState(itUID);

    // let [ supportRequestTitle, setSupportRequestTitle ] = useState("");
    // let [ category, setCategory ] = useState("");
    // let [ description, setDescription ] = useState("");
    // let [ location, setLocation ] = useState("");
    // let [ phoneExt, setPhoneExt ] = useState("");
    // let [ room, setRoom ] = useState("");

    const [  formField, setFormField ] = useState({
        supportRequestTitle :   "",
        category            :   "",
        description         :   "",
        location            :   "",
        phoneExt            :   "",
        room                :   "",
        attachment          :   "",
    });

  let [ isTransferSuccessful, setIsTransferSuccessful ] = useState(null);

  var subtitle;

  const onChange = (event) => {
    setFormField( { [ event.target.name ] : event.target.value });
    console.log(`${[ event.target.name ]} : ${event.target.value}`);
  }; //end onChange() handler


  const afterOpenModal = async () => {
      console.log("<TransferToITModal/>afterOpenModal()");
      console.log("<TransferToITModal/>afterOpenModal() itUID:\t", itUID);

      setIsLoading(false);
  }; //afterOpenModal()

  const submitRequest = async (event) => {
    console.log("submit Request");

    alert(JSON.stringify(formField));
    event.preventDefault();
    event.stopPropagation();
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

        <CloseButton onClick={ () => toggleModal(false) } title="Close modal">&times;</CloseButton>
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
                
                onChange    =   { supportRequestTitle }
            />
            <SelectInputField
                name        =   "category" 
                title       =   { "Category:" }

                onChange    =   {  category }
            />

            <ModalTextInputField
                name        =   "description"
                title       =   "Description:" 
                inputType   =   "text"
                placeholder =   "What is the issue at hand?"

                onChange    =   { description }
            />

            <SelectInputField 
                name        = "location"
                title       = "Location:" 

                onChange    =   { location}
            />
            
            <ModalTextInputField
                name        =   "phoneExt"
                title       =   "Phone Extension:" 
                inputType   =   "text"
                placeholder =   "Office Phone Ext."

                onChange    =   { phoneExt }
            />

            <ModalTextInputField
                name        =   "room"
                title       =   "Office/ Room Number:" 
                inputType   =   "text"
                placeholder =   "Your location"

                onChange    =   { room }
            />
            <SubmitButton 
                type    =   "submit"
            >
                Submit Request
            </SubmitButton>
        </Form>

        <TransferResultMessage className="transfer-result-message">
          {
            (isTransferSuccessful !== null) ?
              ( (isTransferSuccessful === true) ? "Transfer successful \u2714" : 
                  "Could not complete transfer \u00D7" 
              )
              : null
          }
        </TransferResultMessage>
      </TransferToITModalContainer>
  ); //end return statement
}; //end TransferToITModal()

export default SupportRequestModal;