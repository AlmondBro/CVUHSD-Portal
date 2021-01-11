import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { faLaptop, faTicketAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import isDev from 'isdev';
import ReactLoading from 'react-loading';

import { ModalTextInputField, SelectInputField, HelpdeskSubmitMessage,TransferToITModalContainer, CloseButton, Form, ModalTitle, SubmitButton, FAIconStyled, TransferResultMessage } from './SupportRequestModalStyledComponents.js';

/* eslint no-restricted-globals:0 */
const SupportRequestModal = ({ districtPosition, renderAsStudent, fullName, email, site, toggleModal, modalIsOpen, itUID, notify }) => {
    let [ isLoading, setIsLoading ]     = useState(false);

    let [ categories, setCategories ]   = useState([]);
    let [ locations, setLocations ]     = useState([]);

    let [ isRequestSuccessful, setIsRequestSuccessful ] = useState(null);

    let [ submitEnabled, setSubmitEnabled ] = useState(false);  
    
    let history             = useHistory();
    let routerLocation    = useLocation();
    let match             = useRouteMatch();

    let [ formField, setFormField ] = useState({
        supportRequestTitle :   "",
        category            :   "",
        description         :   "",
        location            :   "",
        phoneExt            :   "",
        room                :   "",
        attachment          :   "",
    });

  var titleInput = useRef(null);

  const onChange = (event) => {
    setFormField( { ...formField, [ event.target.name ] : event.target.value });
  }; //end onChange() handler

  const afterOpenModal = async () => {
      console.log("<TransferToITModal/>afterOpenModal()");
      console.log("<TransferToITModal/>afterOpenModal() itUID:\t", itUID);

      setSubmitEnabled(true);
      setIsLoading(false);

      titleInput.current.focus();
  }; //afterOpenModal()

  const submitRequest = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    let submitReqResponse = "";

    if (submitEnabled && (isLoading === false) ) {
        setIsLoading(true); 
        setSubmitEnabled(false);

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
    
        submitReqResponse = await fetch(submitRequest_URL, {
            method: 'POST',
            headers: submitRequest_headers,
            body: JSON.stringify({ ...supportReqDetails} )
        })
        .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
        .then((jsonResponse) => jsonResponse)
        .catch((error) => {
            console.error(`Catching error:\t ${error}`);
        }); //end fetch() call
    
        if (submitReqResponse) {
            const responseStatus = submitReqResponse["response_status"].status;
    
            setIsLoading(false);
    
            if (responseStatus === "success") {
    
                setIsRequestSuccessful(true);

                notify(
                    <HelpdeskSubmitMessage
                        districtPosition    =   { districtPosition }
                        renderAsStudent     =   { renderAsStudent }
                        message             =   "Helpdesk Request Submitted"
                        icon                =   { faTicketAlt }
                    />
                ); //end notify()
    
                setTimeout(() => {
                         //Reset the form field after submitting.
    
                    toggleModal(false);
                    
                    setFormField({
                        supportRequestTitle :   "",
                        category            :   "",
                        description         :   "",
                        location            :   "",
                        phoneExt            :   "",
                        room                :   "",
                        attachment          :   "",
                    });
                }, 800);
           
            } else {
                setIsRequestSuccessful(false);

                notify(
                    <HelpdeskSubmitMessage
                        districtPosition    =   { districtPosition }
                        message             =   "Helpdesk Request Failed. Please try again."
                        icon                =   { faTicketAlt }
                    />
                );
            } //ennd inner else statement
        } //end outer if-statement
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

    return submitReqResponse;
  }; //end submitRequest

  const bodyOpenClassName="support-request-modal-body--open",
        htmlOpenClassName="support-request-modal-html--open",
        overlayClassName="support-request-modal-overlay",
        portalClassName="support-request-modal",
        contentClassName="support-request-modal-content",
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

    
    useEffect(() => {
        const categoriesList = (districtPosition.toLowerCase() === "student") ?   [ 
            "Password Issue", "Canvas", "PowerSchool", "Illuminate", "Google", "Wi-fi Issue", 
            "Software Installation", "Student Chromebook", "Other"
        ] :     [   "Computer Issue", "Printer Issue", "Projector Issue", "Password Issue", 
                    "Canvas", "PowerSchool", "Illuminate", "Google", "Wi-fi Issue", 
                    "Eno Pen -- Board", "Software Installation", "Student Chromebook",
                    "Phone Issue", "Other"
                ];
    
                              
    
        const locationsList =   (districtPosition.toLowerCase() === "student") ? [ site.toString() ] :
                                    [   "Lawndale High School", "Leuzinger High School", "Hawthorne High School", 
                                        "District Office", "Lloyde High School", "CV Independent Study", 
                                        "Service Center"
                                    ];

        setCategories(categoriesList);
        setLocations(locationsList);

        //Set the dropdown's form field values to default to being the first one
        setFormField( 
                        { 
                            ...formField, 
                                category  : categoriesList[0],
                                location  : locationsList[0]       
                        }
                    );

    }, [ site, districtPosition ]); //end useEffect()

    const onClose = () => {
        setIsRequestSuccessful(null);
        toggleModal(false);

        let rootPathName = (districtPosition.toLowerCase() === "student" || renderAsStudent) ? "/student" : "/staff";
        history.push(rootPathName);
    }; //end onClose()

    useEffect(() => {
        if (routerLocation.pathname.indexOf(`${match.url}/submit-support-request`) > -1) {
            toggleModal(true);
        }
    }, [ routerLocation ] );

  return (
      <TransferToITModalContainer
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
        htmlOpenClassName           =   "support-request-modal-html--open"
        className                   =   { contentClassName }

        
        parentSelector           =   { () => document.getElementById("cvuhsd-sso-portal")}

        shouldCloseOnOverlayClick   =   { false }
        closeTimeoutMS              =   { 300 }
      >
        <CloseButton 
            title               =   "Close modal"
            districtPosition    =   { districtPosition.toLowerCase() }
            renderAsStudent     =   { renderAsStudent }
            onClick             =   { () => toggleModal(false) } 
        >
            &times;
        </CloseButton>
        <Form onSubmit={ submitRequest }>
            <label htmlFor="it-transfer-select">
                <ModalTitle 
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                >
                    Tech Support Request
                </ModalTitle>
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                    icon                =   { faLaptop }
                />
            </label>

            <ModalTextInputField
                name                =   "supportRequestTitle"
                title               =   "Title:" 
                districtPosition    =   { districtPosition.toLowerCase() }
                renderAsStudent     =   { renderAsStudent }

                inputType           =   "text"
                placeholder         =   "Support Request Title"
                
                onChange            =   { onChange }   
                value               =   { supportRequestTitle }
                ref                 =   { titleInput } 

                required
            />
            <SelectInputField
                name                =   "category" 
                title               =   { "Category:" }
                districtPosition    =   { districtPosition.toLowerCase() }
                renderAsStudent     =   { renderAsStudent }

                options             =   { categories }

                onChange            =   { onChange }  
                value               =   {  category }
            />

            <ModalTextInputField
                name                =   "description"
                title               =   "Description:" 
                districtPosition    =   { districtPosition.toLowerCase() }
                renderAsStudent     =   { renderAsStudent }

                inputType           =   "text"
                placeholder         =   "What is the issue at hand?"
                
                onChange            =   { onChange }  
                value               =   { description }
                required
                textArea 
            />

            <SelectInputField 
                name                =   "location"
                title               =   "Location:" 
                districtPosition    =   { districtPosition.toLowerCase() }
                renderAsStudent     =   { renderAsStudent }

                options             =   { locations }
                value               =   { location  }
                onChange            =   { onChange  }
            />
            
            <ModalTextInputField
                name                =   "phoneExt"
                title               =   "Phone Ext./ Number:" 
                districtPosition    =   { districtPosition.toLowerCase() }
                renderAsStudent     =   { renderAsStudent }

                inputType           =   "tel"
                placeholder         =   "XXX-XXX-XXX"

                value               =   { phoneExt }
                onChange            =   { onChange }  
            />

            {
                (districtPosition.toLowerCase() === "student") ? null : (
                    <ModalTextInputField
                        name                =   "room"
                        title               =   "Office/ Room Number:" 
                        districtPosition    =   { districtPosition }
                        renderAsStudent     =   { renderAsStudent }

                        inputType           =   "text"
                        placeholder         =   "Your location"
        
                        value               =   { room }
                        onChange            =   { onChange }
                    />
                ) 
            }
         
            <SubmitButton 
                districtPosition    =   { districtPosition.toLowerCase() }
                renderAsStudent     =   { renderAsStudent }

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
                        /> ) : "Submit Request"
                }
            </SubmitButton>
        </Form>

        <TransferResultMessage 
            className           =   "transfer-result-message"
            districtPosition    =   { districtPosition.toLowerCase() }
            renderAsStudent     =   { renderAsStudent }
        >
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