import React, { Fragment, useState } from 'react';

import { faLaptop } from '@fortawesome/free-solid-svg-icons';



import { 
    ModalTextInputField, SelectInputField, 
    TransferToITModalContainer, CloseButton, Form, ModalTitle, SelectDropDownArrow, Select, TransferButton, FAIconStyled, TransferResultMessage, NoCVTechsMessage } from './SupportRequestModalStyledComponents.js';


const SupportRequestModal = ({ toggleModal, modalIsOpen, itUID }) => {
  let [ isLoading, setIsLoading ] = useState(false);
  let [ cvTechOptions, setCVTechOptions] = useState([]);

  let [ changedITUID, setChangedITUID ] = useState(itUID);

  let [ isTransferSuccessful, setIsTransferSuccessful ] = useState(null);

  var subtitle;

  const onChange = (event) => {
    console.log("<TransferToITModal/> onChange():", event.target.value)
    setChangedITUID(event.target.value);
  }; //end onChange() handler


  const afterOpenModal = async () => {
      console.log("<TransferToITModal/>afterOpenModal()");
      console.log("<TransferToITModal/>afterOpenModal() itUID:\t", itUID);

      setIsLoading(false);
  }; //afterOpenModal()

  const bodyOpenClassName="transfer-to-it-modal-body--open",
        htmlOpenClassName="transfer-to-it-modal-html--open",
        overlayClassName="transfer-to-it-modal-overlay",
        portalClassName="transfer-to-it-modal",
        contentClassName="transfer-to-it-modal-content",
        parentSelectorID="chat-page-main-container";

  return (
      <TransferToITModalContainer
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => toggleModal(false)}

        contentLabel={"Transfer to IT Modal"}
        portalClassName={portalClassName}
        overlayClassName={overlayClassName}
        className={contentClassName}
        bodyOpenClassName={bodyOpenClassName}
        htmlOpenClassName="transfer-to-it-modal-html--open"
        
        // parentSelector={() => document.getElementById(parentSelectorID) }

        shouldCloseOnOverlayClick={false}

        closeTimeoutMS={300}
      >

        <CloseButton onClick={ () => toggleModal(false) } title="Close modal">&times;</CloseButton>
        <Form onSubmit={ () => console.log }>
          <label htmlFor="it-transfer-select">
              <ModalTitle ref={_subtitle => (subtitle = _subtitle)}>Support Request</ModalTitle>
              <FAIconStyled
                    icon    =   { faLaptop }
              />
          </label>

         <ModalTextInputField
            title       =   "Title:" 
            inputType   =   "text"
            placeholder =   "Support Request Title"
         />
        <SelectInputField title = { "Category:" }/>

        <ModalTextInputField
            title       =   "Description:" 
            inputType   =   "text"
            placeholder =   "What is the issue at hand?"
            textArea
         />

        <SelectInputField title = { "Location:" }/>
        
        <ModalTextInputField
            title       =   "Phone Extension:" 
            inputType   =   "text"
            placeholder =   "Office Phone Ext."
        />

        <ModalTextInputField
            title       =   "Office/ Room Number:" 
            inputType   =   "text"
            placeholder =   "Your location"
        />
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