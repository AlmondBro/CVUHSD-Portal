import React, { Component } from "react";

//Import App components
import BlueSection from "./BlueSection/BlueSection.js";
import Header from "./Header.js";

//Import list of buttons
import { blueSectionInfo_Staff , redSectionInfo_Student} from "./../objectFiles/blueSectionInfo.js";

import isDev from 'isdev';
import undefsafe from 'undefsafe';

//TODO: Save passed props from <Redirect> into state.
//TODO: Enlarge the All links embedded google sheet
class PageContent extends Component {
    constructor(props) {
        super(props);
        console.log("PageContent Props:\t" + JSON.stringify(this.props) );
        
        this.modifyLogInStatus = this.props.modifyLogInStatus|| this.props.location.state.modifyLogInStatus;
        this.modifyStudentStatus = this.props.modifyStudentStatus;

        this.modifyFullName = this.props.modifyFullName;
        
        this.title = this.props.title;
        
        this.blueSection_objectsArrayProps = {};

        //TODO: Remove these attributes
        this.state = {
            fullName : this.props.fullName || undefsafe(this.props.location.state, "fullName") || "CVUHSD User",
            logInSuccess :  this.props.loggedIn || undefsafe(this.props.location.state, "logInSuccess"),
            isStudent: this.props.isStudent || undefsafe(this.props.location.state, "isStudent") || false,
            title: this.props.title|| undefsafe(this.props.location.state, "title") || "student",
            site: this.props.site || undefsafe(this.props.location.state, "site") || "student"
        }; //end state{} object

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
                />
            );
        });
    };

    componentDidMount = (props) => {
        this.props.changeContainerStyle({"background-image": "none" });
        console.log("Page content this.title:\t" + this.title);

    };
    
    render = () => {
        let sectionInfoObject;

        sectionInfoObject = (this.title == "student") ? 
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
                />,
                <div className="page-content">
                    { this.generateBlueSections(this.blueSection_objectsArrayProps)} 
                </div>
            ]
        );
    }; //end render()
} //end PageContent class


export default PageContent;