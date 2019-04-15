import React from "react";

//Import components
import BlueSectionButton from "./BlueSectionButton.js";

const BlueSection = (props) => {
    return (
        <section class="blue-section" id={props.blueSectionName + "blueSection"}>
            <input type="checkbox" class="checkbox-hack blueSection-collapseToggle" id= {props.blueSectionName + "collapseToggle"} checked="" />
            <div class="section-header">
                <h3>{props.headerTitle}</h3>
                <label for={props.blueSectionName + "collapseToggle"}>
                    <div class="open-column-button"></div>
                </label>
            </div>
            <div class="row button-row" id={props.buttonRowID}>
              {
                  this.generateBlueSectionButtons()
              }
            </div>
    </section>
    );
};

export default BlueSection;