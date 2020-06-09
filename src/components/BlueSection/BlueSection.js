import React from "react";

//Import components
import {    BlueSectionContainer, InputCheckBoxHack, BlueSectionButton, 
            SectionHeader, OpenColumnButton, ButtonRow, 
            AllLinksGoogleSheet, SystemStatuses }  from "./BlueSection_StyledComponents.js";

const BlueSection = (props) => {
    let generateBlueSectionButtons = () => {
        console.log("generateBlueSectionButtons()");

        if ( (  (typeof(props.buttons) !== "undefined") || (props.buttons != null) )
                && (props.buttonRowID !== "systemStatusesButtonRow")
            ) {
            
                let buttonsArray = Object.values(props.buttons);
                
                return [...buttonsArray].map( (buttonObject, index) => {
                    return (<BlueSectionButton 
                                key         =   { index } 
                                buttonLink  =   { buttonObject.buttonLink} 
                                buttonImg   =   { buttonObject.buttonImg } 
                                description =   { buttonObject.description }
                            />); //end inner return statement
            }); //return map() function

            /* For loop can work here, but it does not return any new values whereas map does: 
                Source: https://stackoverflow.com/questions/45576223/why-are-for-loops-not-allowed-in-react-jsx
            */
        } else if (props.buttonRowID === "systemStatusesButtonRow") {
           return  (<SystemStatuses 
                        title       = "System Statuses"  
                        src         = 'https://www.site24x7.com/sv.do?id=-lTskTIBFC99AjBdJTzdd22ylcZvGBYnfGhcgwvt1-27W89lFFvf7WICSx8TdzUT6kB92hYLWdGYIInKaxcmHcJTzDPBf7IFLjpWmnUEJ18%3D&st=false' 
                        scrolling   = 'yes'
                    />);
        } else if (props.buttonRowID === "webAdminButtonRow") {
            return (
                    <AllLinksGoogleSheet 
                            title       = "All Links Google Sheets"
                            className   = "google-sheet" 
                            src         = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOPMzFTLmTXsOzY172KN_3IaJqeO9bLPl_3TIgc_bBQiWEanznykV6cEiPBuV9WUHEnL2vesphHEWZ/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
                            scolling    = "yes"
                    />
                    );
        }//end else-statement
    }; //end generateBlueSectionButtons()

    /* 
        Interesting piece of information about the checked property in React: 
        React treats a value of null as if the property was not set at all. Use the 
        double exclamation point to cast null or undefined to false, and register the checked 
        property as part of controlled form component. 
        https://stackoverflow.com/questions/39120007/setting-a-checkbox-check-property-in-react 
    */

    return (
        <BlueSectionContainer   className       =   "blue-section" 
                                id              =   { props.blueSectionName + "-blueSection" } 
                                renderAsStudent =   { props.renderAsStudent }
        >
            <InputCheckBoxHack 
                type            =   "checkbox" 
                className       =   "checkbox-hack blueSection-collapseToggle" 
                id              =   { props.blueSectionName + "-collapseToggle" } 
                defaultChecked  =   { props.expanded } 
                renderAsStudent =   { props.renderAsStudent }
            />
            <SectionHeader 
                className       =   "section-header" 
                title           =   { props.title }
                renderAsStudent =   { props.renderAsStudent }
            >
                <h3>{props.headerTitle}</h3> 
                <label 
                    htmlFor =   { props.blueSectionName + "-collapseToggle" }
                >
                    <OpenColumnButton   
                        className       =   "open-column-button"  
                        title           =   { props.title }
                        renderAsStudent =   { props.renderAsStudent }
                    >
                        
                    </OpenColumnButton>
                </label>
            </SectionHeader>
            <ButtonRow  
                        className       =  "row button-row" 
                        id              =   { props.buttonRowID } 
                        title           =   { props.title }
                        renderAsStudent =   { props.renderAsStudent }
            >
                {
                    generateBlueSectionButtons()
                }
            </ButtonRow>
        </BlueSectionContainer>
    );
};

export default BlueSection;