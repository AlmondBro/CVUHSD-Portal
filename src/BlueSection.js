import React from "react";

//Import components
import BlueSectionButton from "./BlueSectionButton.js";

const BlueSection = (props) => {
    let generateBlueSectionButtons = () => {
        console.log("generateBlueSectionButtons()");
        for (let i=0; i<= props.buttons; i++) {
            return <BlueSectionButton buttonLink={props.buttons[i].buttonLink} buttonImg={props.buttons[i].buttonImg} />
        }
    };

    let blueSectionButton = (buttonLink, buttonImg) => {
        return {
            buttonLink: buttonLink,
            buttonImg: buttonImg
        };
    };

    return (
        <section className="blue-section" id={props.blueSectionName + "blueSection"}>
            <input type="checkbox" className="checkbox-hack blueSection-collapseToggle" id= {props.blueSectionName + "collapseToggle"} defaultChecked />
            <div className="section-header">
                <h3>{props.headerTitle}</h3>
                <label htmlFor={props.blueSectionName + "collapseToggle"}>
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