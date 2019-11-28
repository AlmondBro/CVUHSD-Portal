import React, { Component } from "react";

import {  Redirect } from 'react-router'

//Import App components
import BlueSection from "./BlueSection/BlueSection.js";
import Header from "./Header.js";

//Import list of buttons
import { blueSectionInfo_Staff , blueSectionInfo_Student} from "./../objectFiles/blueSectionInfo.js";

import isDev from 'isdev';
import undefsafe from 'undefsafe';

//TODO: Save passed props from <Rediret> into state.
class PageContent extends Component {
    constructor(props) {
        super(props);
        console.log("PageContent Props:\t" + JSON.stringify(this.props) );
        
        this.modifyLogInStatus = this.props.modifyLogInStatus|| this.props.location.state.modifyLogInStatus;
        this.modifyStudentStatus = this.props.modifyStudentStatus;

        //TODO: Remove these attributes
        this.modifyFullName = this.props.modifyFullName;
        this.modifyTitle = this.props.modifyTitle;
        this.modifySite = this.props.modifySite;
        
        this.title = this.props.title;

        this.state = {
            fullName : this.props.fullName || undefsafe(this.props.location.state, "fullName") || "CVUHSD User",
            logInSuccess :  this.props.loggedIn || undefsafe(this.props.location.state, "logInSuccess"),
            isStudent: this.props.isStudent || undefsafe(this.props.location.state, "isStudent") || false,
            title: this.props.title || undefsafe(this.props.location.state, "title") || "student",
            site: this.props.site || undefsafe(this.props.location.state, "site") || "student"
        }; //end state{} object
      } //end constructor

      testProps = {
        blueSection_objectsArray: (this.title === "student") ? blueSectionInfo_Student : blueSectionInfo_Staff
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
                    title={this.title}
                />
            );
        });
    };

    
    componentDidMount = (props) => {
        this.props.changeContainerStyle({"background-image": "none" });
    };
    
    render = () => {
       return (
           [
            <Header districtName="CVUHSD" 
                    headerTitle="Portal" 
                    fullName={ this.props.fullName || undefsafe(this.state, "fullName")|| "CVUHSD User"} 
                    title={this.props.title}
                    site={this.props.site}

                    modifyLogInStatus={ this.modifyLogInStatus }
                    modifyTitle={this.modifyTitle}
                    modifySite={this.modifySite}
            />,
            <div className="page-content">
                { this.generateBlueSections(this.testProps)}
            </div>
            ]
        );
    }; //end render()
} //end PageContent class


export default PageContent;