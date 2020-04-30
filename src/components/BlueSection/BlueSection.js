import React from "react";

//Import components
import BlueSectionButton from "./BlueSectionButton.js";

//Import 3rd-party APIs
import styled from 'styled-components';


let AllLinksGoogleSheet = styled("iframe")`
    width: 50%;
    height: 90vh;
`; //end AllLinksGoogleSheet

let SystemStatuses = styled("iframe")`
    align: "center";
    height: 400px;
    width: 1200px;
    border: 0;
`; //end SystemStatuses


const BlueSection = (props) => {
    let generateBlueSectionButtons = () => {
        console.log("generateBlueSectionButtons()");

        if ( (typeof(props.buttons) !== "undefined" || props.buttons != null) && props.buttonRowID !== "systemStatusesButtonRow") {
            
            let buttonsArray = Object.values(props.buttons);
            
            return [...buttonsArray].map( (buttonObject, index) => {
               /* Group buttons in tabs of four */
              /*  if (index %4 === 0 && index >= 4 ) {
                    return (
                        <div key={index}></div>
                        ); 

                    return null;
                } //end if statement */

                return (<BlueSectionButton 
                            key={index} 
                            buttonLink={buttonObject.buttonLink} 
                            buttonImg={buttonObject.buttonImg} 
                            description={buttonObject.description}
                        />); 
            }); //return map() function

            /* For loop can work here, but it does not return any new values whereas map does: 
                Source: https://stackoverflow.com/questions/45576223/why-are-for-loops-not-allowed-in-react-jsx
            */
           /*
            let buttonsArray = [];
            for (let i=0; i < props.buttons.length; i++) {
                buttonsArray.push(<BlueSectionButton 
                                    key={i} 
                                    buttonLink={props.buttons.buttonLink} 
                                    buttonImg={props.buttons.buttonImg} 
                                />);
            }
            
            return buttonsArray; */
        
        } else if (props.buttonRowID === "systemStatusesButtonRow") {
           return  (<SystemStatuses 
                        title="System Statuses"  
                        src='https://www.site24x7.com/sv.do?id=-lTskTIBFC99AjBdJTzdd22ylcZvGBYnfGhcgwvt1-27W89lFFvf7WICSx8TdzUT6kB92hYLWdGYIInKaxcmHcJTzDPBf7IFLjpWmnUEJ18%3D&st=false' 
                        scrolling='yes'
                    />);
        } else if (props.buttonRowID === "webAdminButtonRow") {
            return (
                    <AllLinksGoogleSheet title="All Links Google Sheets"
                            className="google-sheet" 
                            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSOPMzFTLmTXsOzY172KN_3IaJqeO9bLPl_3TIgc_bBQiWEanznykV6cEiPBuV9WUHEnL2vesphHEWZ/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
                            scolling="yes"
                    />
                    );
        }//end else-statement
    }; //end generateBlueSectionButtons()

    let BlueSectionContainer = styled("section")`
        position: relative;
        text-align: center;
        overflow: hidden;

        & a button,
        & a button img {
            border: 0;
            background-color: transparent;
        }
    `; //end BlueSection

    let InputCheckBoxHack = styled("input")`
        display: none;

        &:checked+div.blue-section-innerContainer>div.section-content {
            display: table;
        }

        &:checked+div.section-header label>div.open-column-button::after {
                content: '-';
        }

        &+div.section-header label>div.open-column-button::after {
                content: '+';
        }

        &:checked~div#${props.buttonRowID} {
            margin: 2.5% auto;
            height: 100%;
        }
    `; //end CheckboxHack

    let SectionHeader = styled("div")`
        background-color: ${ props => 
            (props.title === ("Student") || props.renderAsStudent ) ? 
                "rgb(147, 30, 30)": "rgb(30, 108, 147)"
        };

        /* A nice green: rgb(30, 147, 44) */

        color: white;
        text-align: center;
        padding: 15px 0;
        vertical-align: middle;

        & h3 {
            font-size: 1.7em;
            display: inline;
            font-family: Lato, sans-serif;
        }
    `; //end sectionHeader

    let OpenColumnButton = styled("div")`
        cursor: pointer;
        border: 0;
        background: transparent;
        font-size: 2.2em;
        padding: 0px 9px 3px 9px;
        display: inline;
        margin-left: 20px;
        /*  used to be 5px*/
        /*  Padding when icons were being used :
            padding: 0px 5px 5px 5px;
        /*  padding: 5px 10px 10px 10px; */
        border-radius: 100%;
        background-color: white;
        color: ${ props => 
            (props.title === ("Student") || props.renderAsStudent ) ? 
                "rgb(147, 30, 30)": "rgb(30, 108, 147)"
        };

        &::before, &::after {
            content: '+';
            /* \02295' */ 
        }
    `; //end openColumnButton

    let ButtonRow = styled("div")`
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;
        height: 0;
        margin: 0 auto;
        transition: height, margin 0.5s;
    `;

    /* 
        Interesting piece of information about the checked property in React: 
        React treats a value of null as if the property was not set at all. Use the 
        double exclamation point to cast null or undefined to false, and register the checked 
        property as part of controlled form component. 
        https://stackoverflow.com/questions/39120007/setting-a-checkbox-check-property-in-react 
    */

    return (
        <BlueSectionContainer   className="blue-section" 
                                id={props.blueSectionName + "-blueSection"} 
                                renderAsStudent={props.renderAsStudent}
        >
            <InputCheckBoxHack 
                type="checkbox" 
                className="checkbox-hack blueSection-collapseToggle" 
                id= {props.blueSectionName + "-collapseToggle"} 
                defaultChecked={props.expanded} 
                renderAsStudent={props.renderAsStudent}
            />
            <SectionHeader 
                className="section-header" 
                title={props.title}
                renderAsStudent={props.renderAsStudent}
            >
                <h3>{props.headerTitle}</h3> 
                <label htmlFor={props.blueSectionName + "-collapseToggle"}>
                    <OpenColumnButton   
                        className="open-column-button"  
                        title={props.title}
                        renderAsStudent={props.renderAsStudent}
                    >
                        
                    </OpenColumnButton>
                </label>
            </SectionHeader>
            <ButtonRow  className="row button-row" 
                        id={props.buttonRowID} 
                        title={props.title}
                        renderAsStudent={props.renderAsStudent}
            >
            {
                generateBlueSectionButtons()
            }
            </ButtonRow>
        </BlueSectionContainer>
    );
};

export default BlueSection;