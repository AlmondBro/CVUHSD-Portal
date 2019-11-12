import React, { Component } from "react";

import {  Redirect } from 'react-router'

//Import App components
import BlueSection from "./BlueSection/BlueSection.js";
import Header from "./Header.js";

//Import list of buttons
import { blueSectionInfo_Staff } from "./../objectFiles/blueSectionInfo.js";

import isDev from 'isdev';
import undefsafe from 'undefsafe';
import { thisExpression } from "@babel/types";

//TODO: Save passed props from <Rediret> into state.
class PageContent extends Component {
    constructor(props) {
        super(props);
        console.log("PageContent Props:\t" + JSON.stringify(this.props) );
        this.modifyLogInStatus = this.props.modifyLogInStatus|| this.props.location.state.modifyLogInStatus;
        this.modifyStudentStatus = this.props.modifyStudentStatus;
        this.modifyFullName = this.props.modifyFullName;

        this.state = {
            fullName : this.props.fullName || undefsafe(this.props.location.state, "fullName") || "CVUHSD User",
            logInSuccess :  this.props.loggedIn || undefsafe(this.props.location.state, "logInSuccess"),
            isStudent: this.props.isStudent || undefsafe(this.props.location.state, "isStudent") || false

        }; //end state{} object
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
        this.props.changeContainerStyle({"background-image": "none" });
    };
    
      render = () => {
       return this.props.loggedIn ? 
        ([
            <Header districtName="CVUHSD" 
                    headerTitle="Portal" 
                    fullName={ this.props.fullName || undefsafe(this.state, "fullName")|| "CVUHSD User"} 
                    modifyLogInStatus={ this.modifyLogInStatus }
            />,
            <div className="page-content">
                { this.generateBlueSections(this.testProps)}
            </div>
        ]) : (<Redirect to="/login" />); //A protected route
      }; //end render()
} //end PageContent class


export default PageContent;