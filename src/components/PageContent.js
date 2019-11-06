import React, { Component } from "react";

//Import App components
import BlueSection from "./BlueSection/BlueSection.js";
import Header from "./Header.js";

//Import list of buttons
import { blueSectionInfo_Staff } from "./../objectFiles/blueSectionInfo.js";

class PageContent extends Component {
    constructor(props) {
        super(props);
        console.log("PageContent Props:\t" + JSON.stringify(this.props) );
      } //end constructor

      testProps = {
        blueSection_objectsArray: blueSectionInfo_Staff
    };
    
      generateBlueSections = (props) => {
        return props.blueSection_objectsArray.map( (blueSection_Object, index) => {
            return (
                <BlueSection 
                    blueSectionName={blueSection_Object.blueSectionName}
                    expanded={ blueSection_Object.expanded }
                    headerTitle={blueSection_Object.headerTitle}
                    buttonRowID={blueSection_Object.buttonRowID}
                    buttons={blueSection_Object.buttons}
                    key={index}
                />
            );
        });
    };
    
    componentDidMount = (props) => {
        this.props.changeContainerStyle({"background": "red !important", "background-image": "none" });
    };
    
      render = () => {
        return ([
            <Header districtName="CVUHSD" headerTitle="Portal" fullName={this.props.location.state.fullName || "CVUHSD User"} />,
            <div className="page-content">
                { this.generateBlueSections(this.testProps)}
            </div>
        ]);
      }; //end render()
} //end PageContent class


export default PageContent;