import React from "react";

//Import App components
import BlueSection from "./BlueSection/BlueSection.js";
import Header from "./Header.js";

//Import list of buttons
import { blueSectionInfo_Staff } from "./../blueSectionInfo.js";

let testProps = {
    blueSection_objectsArray: blueSectionInfo_Staff
}

const PageContent = (props) => {
    let generateBlueSections = (props) => {
        return props.blueSection_objectsArray.map( (blueSection_Object, index) => {
            return (
                <BlueSection 
                    blueSectionName={blueSection_Object.blueSectionName}
                    expanded={ false }
                    headerTitle={blueSection_Object.headerTitle}
                    buttonRowID={blueSection_Object.buttonRowID}
                    buttons={blueSection_Object.buttons}
                    key={index}
                />
            );
        });
    };

    return ([
        <Header districtName="CVUHSD" headerTitle="Portal" />,
        <div className="page-content">
            { generateBlueSections(testProps)}
        </div>
    ]);
}; 

export default PageContent;