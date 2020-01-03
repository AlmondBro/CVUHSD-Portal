import React, { Component } from "react";

//Import App components
import BlueSection from "./BlueSection/BlueSection.js";
import Header from "./Header.js";

//Import list of buttons
import { blueSectionInfo_Staff , redSectionInfo_Student} from "./../objectFiles/blueSectionInfo.js";

import undefsafe from 'undefsafe';

//TODO: Save passed props from <Redirect> into state.
//TODO: Enlarge the All links embedded google sheet
class PageContent extends Component {
    constructor(props) {
        super(props);

        this.modifyLogInStatus = this.props.modifyLogInStatus|| this.props.location.state.modifyLogInStatus;
        this.modifyStudentStatus = this.props.modifyStudentStatus;

        this.modifyFullName = this.props.modifyFullName;
        
        this.title = this.props.title;
        
        this.blueSection_objectsArrayProps = {};

        this.renderAsStudent = undefsafe(this.props, "renderAsStudent") || undefsafe(props.location, "state", "renderAsStudent") || "";

      } //end constructor
    
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
                    title={this.title || "student"}
                    renderAsStudent={this.renderAsStudent || this.props.location.state.renderAsStudent}
                />
            );
        });
    };

    componentDidMount = (props) => {
        console.log("PageContent Props Location:\t" + JSON.stringify(this.props.location.state.renderAsStudent) );

        this.props.changeContainerStyle({"background-image": "none" });
        console.log("Page content this.title:\t" + this.title);

        if (this.props.title === "student" || this.props.renderAsStudent === true) {
            document.title = "CVUHSD | Student Portal"
        } else {
            document.title = "CVUHSD | Staff Portal"
        }
    };
    
    render = () => {
        let sectionInfoObject;

        sectionInfoObject = (this.title === "student" || this.renderAsStudent) ? 
                                    redSectionInfo_Student : blueSectionInfo_Staff;
        
        this.blueSection_objectsArrayProps = {
            blueSection_objectsArray: sectionInfoObject
        };

       return (
           [
                <Header districtName="CVUHSD" 
                        headerTitle="Portal" 
                        fullName={ this.props.fullName || undefsafe(this.state, "fullName")|| "CVUHSD User"} 
                        title={this.title}
                        site={this.props.site}

                        modifyLogInStatus={ this.modifyLogInStatus }
                        modifyTitle={this.modifyTitle}
                        modifySite={this.modifySite}
                        renderAsStudent={this.renderAsStudent}
                />,
                <div className="page-content">
                    { this.generateBlueSections(this.blueSection_objectsArrayProps)} 
                </div>
            ]
        );
    }; //end render()
} //end PageContent class


export default PageContent;