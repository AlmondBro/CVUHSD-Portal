import React, { useState, useEffect } from 'react';
import { faTasks, faFilter } from '@fortawesome/free-solid-svg-icons';

import isDev from 'isdev';
import ReactLoading from 'react-loading';

import { Container, CloseButton, InnerContainer, ModalTitle, RequestTypeTitle, FilterButton, TitleFilterContainer, FilterText, FAIconStyled } from './ViewRequestsModalStyledComponents.js';

const ViewRequestsModal = ({ districtPosition, fullName, email, site, toggleModal, modalIsOpen, itUID, notify }) => {
    let [ isLoading, setIsLoading ]                         = useState(false);
    let [ changePasswordResult, setChangePasswordResult ]   = useState(null);

    let [ serverMessage, setServerMessage ]                 = useState("");

    let [ submitEnabled, setSubmitEnabled ]                 = useState(false);

    const [ formField, setFormField ]                       = useState({
                                                                    currentPassword         :   "",
                                                                    confirmNewPassword  :   "",
                                                                    newPassword         :   ""
                                                                });

  const onChange = (event) => {
    setFormField( { ...formField, [ event.target.name ] : event.target.value });
  }; //end onChange() handler


  const afterOpenModal = async () => {
      setSubmitEnabled(true);
      setIsLoading(false);
      setServerMessage("");
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
      <Container
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
        <InnerContainer>
            <div>
                <ModalTitle 
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    View Requests
                </ModalTitle>
                
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    
                    icon                =   { faTasks }
                />
            </div>

            <TitleFilterContainer className="title-filter-container">
                <RequestTypeTitle
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    All Requests
                </RequestTypeTitle>

                <FilterButton
                    districtPosition    =   { districtPosition.toLowerCase() }
                >
                    <FAIconStyled
                            districtPosition    =   { districtPosition.toLowerCase() }
                            
                            icon                =   { faTasks, faFilter }
                    />
                    <FilterText
                            districtPosition    =   { districtPosition.toLowerCase() }
                    >
                        Filter
                    </FilterText>
                </FilterButton>
            </TitleFilterContainer>
     
        

        </InnerContainer>
      </Container>
  ); //end return statement
}; //end TransferToITModal()

export default ViewRequestsModal;