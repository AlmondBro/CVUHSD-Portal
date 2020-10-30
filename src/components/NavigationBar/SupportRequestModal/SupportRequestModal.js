import React, { Fragment, useState } from 'react';

import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

import { 
    ModalTextInputField,
    TransferToITModalContainer, CloseButton, Form, ModalTitle, SelectDropDownArrow, Select, TransferButton, FAIconStyled, TransferResultMessage, NoCVTechsMessage } from './SupportRequestModalStyledComponents.js';


const SupportRequestModal = ({ toggleModal, modalIsOpen, itUID }) => {
  let [ isLoading, setIsLoading ] = useState(true);
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
                    icon    =   { faExchangeAlt }
              />
          </label>

         <ModalTextInputField
            title       =   "Title:" 
            inputType   =   "text"
            placeholder =   "Support Request Title"
         />
        <ModalTextInputField
            title       =   "Description:" 
            inputType   =   "text"
            placeholder =   "What is the issue at hand?"
            textArea
         />
        <SelectDropDownArrow className="select-drop-down-arrow">
            <Select 
                name="it-transfer-select" 
                id="it-transfer-select"
                onChange= { onChange }
            >
            <option>hello</option>
            </Select> 
        </SelectDropDownArrow>

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

        {
              isLoading ? (
                <p>Loading CVTechs...</p>
              ) : (
                
                   (cvTechOptions.length > 0) ? (
                     <Fragment>
                       <SelectDropDownArrow className="select-drop-down-arrow">
                          <Select 
                              name="it-transfer-select" 
                              id="it-transfer-select"
                              onChange= { onChange }
                          >
                            { cvTechOptions }
                          </Select> 
                       </SelectDropDownArrow>
                     
                      <TransferButton 
                        className="transfer-button" 
                        title="Transfer to Selected IT" 
                        type="submit"
                      >
                        Transfer
                      </TransferButton>
                     </Fragment>
                  )
                  : ( <NoCVTechsMessage className="no-cv-techs-message">No Other CV Techs available</NoCVTechsMessage> )
              )
            }
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