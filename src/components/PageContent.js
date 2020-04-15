import React, { Fragment, Component } from "react";

import { authProvider_noDomainHint  } from './../authProvider.js';

//Import 3rd party modules
import ReactLoading from 'react-loading';
import styled from "styled-components";

//Import App components
import BlueSection from "./BlueSection/BlueSection.js";
import Header from "./Header/Header.js";

//Import list of buttons
import { blueSectionInfo_Staff , redSectionInfo_Student} from "./../objectFiles/blueSectionInfo.js";

import undefsafe from 'undefsafe';

//TODO: Bug -- Changing from the staff to the student portal does not change the page title.
//TODO: Save passed props from <Redirect> into state.
//TODO: Enlarge the All links embedded google sheet
//TODO: Use undefsafe to add this.props.location.state as part of "portal switching". ALso find if this really necessary.
class PageContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
          pathName: null  
        }; //end state object

        // this.modifyLogInStatus = this.props.modifyLogInStatus|| this.props.location.state.modifyLogInStatus;
        this.modifyStudentStatus = this.props.modifyStudentStatus;

        this.modifyFullName = this.props.modifyFullName;
        
        this.blueSection_objectsArrayProps = {};

        this.renderAsStudent = undefsafe(this.props, "renderAsStudent") || undefsafe(this.props.location, "state", "renderAsStudent") || "";
      } //end constructor
    
      PageContentLoading = styled("div")`
        margin: 0 auto;
      `;

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
                    title={this.props.title || "Student"}
                    renderAsStudent={(window.location.pathname === "/student")}
                    // {this.renderAsStudent || this.props.location.state.renderAsStudent}
                />
            );
        });
    }; //end generateBlueSections()

    componentDidMount = () => {
        this.props.modifyRootAccountInfo(this.props.accountInfo);
        this.props.changeContainerStyle({"background-image": "none" });

        console.log("PageContent.js window.location.pathname:\t" + window.location.pathname);

        this.setState({pathName: window.location.pathname});
        if (this.props.title === "student" || this.props.location.state.renderAsStudent === "true" || window.location.pathname === "/student") {
            document.title = "CVUHSD | Student Portal"
        } else {
            document.title = "CVUHSD | Staff Portal"
        }

    };
    
    render = () => {
        let sectionInfoObject;

        sectionInfoObject = (this.props.title === "Student" ||  window.location.pathname === "/student") ? 
                                    redSectionInfo_Student : blueSectionInfo_Staff;
        
        this.blueSection_objectsArrayProps = {
            blueSection_objectsArray: sectionInfoObject
        };

        return (
                <Fragment>
                    <Header districtName="CVUHSD" 
                            headerTitle="Portal" 
                            fullName={ this.props.fullName || undefsafe(this.state, "fullName")|| "CVUHSD User"} 
                            title={this.props.title}
                            site={this.props.site}
                            gradeLevel={this.props.gradeLevel}

                            //modifyLogInStatus={ this.modifyLogInStatus }
                            modifyTitle={this.modifyTitle}
                            modifySite={this.modifySite}
                            logOut={this.props.logOut}
                            clearState={this.props.clearState}
                            renderAsStudent={(window.location.pathname === "/student")}
                    />,
                    { (this.props.title) ? 
                        (
                            <div className="page-content">
                                { this.generateBlueSections(this.blueSection_objectsArrayProps)} 
                            </div>
                        )
                        :   (
                                <this.PageContentLoading>
                                    <ReactLoading 
                                        type={"spinningBubbles"}
                                        height={'60px'} width={'60px'} 
                                        color={'#1E6C93'}
                                    /> 
                                </this.PageContentLoading>
                            )
                    }
                </Fragment>
            );
    }; //end render()
} //end PageContent class


export default PageContent;