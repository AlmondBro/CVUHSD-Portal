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

    // window.alert(JSON.stringify(formField));

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

    //window.alert(JSON.stringify(submitReqResponse));

    if (submitReqResponse) {
        const responseStatus = submitReqResponse["response_status"].status;

        setIsLoading(false);

        // window.alert("responseStatus:\t", responseStatus);

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
    }; //end onClose

  return (
      <TransferToITModalContainer
        isOpen                      =   { modalIsOpen }
        onAfterOpen                 =   { afterOpenModal }
        onAfterClose                =   { onClose }
        shouldCloseOnEsc            =   { true }
        shouldReturnFocusAfterClose =   { true }
        //onRequestClose              =   { onClose }

        contentLabel                =   { "Support Request Modal" }

        // portalClassName             =   { portalClassName }
        // overlayClassName            =   { overlayClassName }
        // bodyOpenClassName           =   { bodyOpenClassName }
        // htmlOpenClassName           =   "transfer-to-it-modal-html--open"
        // className                   =   { contentClassName }

        
        // parentSelector           =   { () => document.getElementById(parentSelectorID)}

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
        <Form onSubmit={ submitRequest }>
            <label htmlFor="it-transfer-select">
                <ModalTitle 
                    districtPosition    =   { districtPosition.toLowerCase() }
                    ref                 =   {_subtitle => (subtitle = _subtitle)} 
                >
                    Tech Support Request
                </ModalTitle>
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    icon                =   { faLaptop }
                />
            </label>

            <ModalTextInputField
                name                =   "supportRequestTitle"
                title               =   "Title:" 
                districtPosition    =   { districtPosition.toLowerCase() }
                inputType           =   "text"
                placeholder         =   "Support Request Title"
                
                onChange            =   { onChange }   
                value               =   { supportRequestTitle }

                required
            />
            <SelectInputField
                name                =   "category" 
                title               =   { "Category:" }
                districtPosition    =   { districtPosition.toLowerCase() }
                
                options             =   { categories }

                onChange            =   { onChange }  
                value               =   {  category }
            />

            <ModalTextInputField
                name                =   "description"
                title               =   "Description:" 
                districtPosition    =   { districtPosition.toLowerCase() }

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
                
                options             =   { locations }
                value               =   { location  }
                onChange            =   { onChange  }

            />
            
            <ModalTextInputField
                name                =   "phoneExt"
                title               =   "Phone Ext./ Number:" 
                districtPosition    =   { districtPosition.toLowerCase() }

                inputType           =   "tel"
                placeholder         =   "A telephone/cell number to reach you by (no parentheses). Leave extension if staff member. "

                value               =   { phoneExt }
                onChange            =   { onChange }  
            />

            {
                (districtPosition.toLowerCase() === "student") ? null : (
                    <ModalTextInputField
                        name                =   "room"
                        title               =   "Office/ Room Number:" 
                        districtPosition    =   { districtPosition }

                        inputType           =   "text"
                        placeholder         =   "Your location"
        
                        value               =   { room }
                        onChange            =   { onChange }
                    />
                ) 
            }
         
            <SubmitButton 
                districtPosition    = { districtPosition.toLowerCase() }
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