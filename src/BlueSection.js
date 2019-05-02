import React from "react";

//Import components
import BlueSectionButton from "./BlueSectionButton.js";

const BlueSection = (props) => {
   
    let generateBlueSectionButtons = () => {
        console.log("generateBlueSectionButtons()");

        if ( (typeof(props.buttons) !== "undefined" || props.buttons != null) && props.buttonRowID !== "systemStatusesButtonRow") {
            let buttonsArray = Object.values(props.buttons);
           return [...buttonsArray].map( (buttonObject, index) => {
               /* Group buttons in tabs of four */
                if (index %4 === 0 && index >= 4 ) {
                    return (
                        <div key={index}></div>
                        ); 
                } 

            return (<BlueSectionButton 
                        key={index} 
                        buttonLink={buttonObject.buttonLink} 
                        buttonImg={buttonObject.buttonImg} 
                        description={buttonObject.description}
                    />); 
            }); 

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
        
        } else {
           return  (<iframe className="statusEmbed" src='https://www.site24x7.com/sv.do?id=-lTskTIBFC99AjBdJTzdd22ylcZvGBYnfGhcgwvt1-27W89lFFvf7WICSx8TdzUT6kB92hYLWdGYIInKaxcmHcJTzDPBf7IFLjpWmnUEJ18%3D&st=false' scrolling='yes'></iframe>);
           // return <BlueSectionButton />
        } //end else-statement
      
    };
    // 
    
    /* 
        Interesting piece of information about the checked property in React: 
        React treats a value of null as if the property was not set at all. Use the 
        double exclamation point to cast null or undefined to false, and register the checked 
        property as part of controlled form component. 
        https://stackoverflow.com/questions/39120007/setting-a-checkbox-check-property-in-react 
        https://stackoverflow.com/questions/39120007/setting-a-checkbox-check-property-in-react
    // */
    return (
        <section className="blue-section" id={props.blueSectionName + "blueSection"}>
            <input type="checkbox" className="checkbox-hack blueSection-collapseToggle" id= {props.blueSectionName + "-collapseToggle"} defaultChecked={!!props.expanded} />
           <div className="section-header">
                <h3>{props.headerTitle}</h3>
                <label htmlFor={props.blueSectionName + "-collapseToggle"}>
                    <div className="open-column-button"></div>
                </label>
            </div>
            <div className="row button-row" id={props.buttonRowID}>
              {
                 generateBlueSectionButtons()
              }
            </div>
    </section>
    );
};

export default BlueSection;