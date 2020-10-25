import React, { Fragment, Component } from "react";

//Import 3rd party modules
import ReactLoading from "react-loading";
import styled from "styled-components";

import isDev from 'isdev';

//Import App components
import BlueSection from "./BlueSection/BlueSection.js";
import Header from "./Header/Header.js";

//Import list of buttons
import { blueSectionInfo_Staff , redSectionInfo_Student} from "./../objectFiles/blueSectionInfo.js";

import undefsafe from "undefsafe";

import Footer from "./Footer/Footer.js";

//TODO: Bug -- Changing from the staff to the student portal does not change the page title.
//TODO: Save passed props from <Redirect> into state.
//TODO: Enlarge the All links embedded google sheet
//TODO: Use undefsafe to add this.props.location.state as part of "portal switching". ALso find if this really necessary.


const PageContentLoading = styled("div")`
    margin: 0 auto;
`;

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
            ); //end return statement
        }); //end outer return statement
    }; //end generateBlueSections()


  ///*
  getUserInfo = async () => {
    console.log("getUserInfo()");

    let getStudentSchool = () => {
      console.log("getStudentSchool()");

      let parseOUforSchool = (organizationalUnit) => {
        console.log("parseOUforSchool()");
        let splitDirectoriesArray = organizationalUnit.split("/");

        let school = splitDirectoriesArray[1];
        let gradeLevel = splitDirectoriesArray[2];

        console.log("splitDirectoriesArray:\t" + splitDirectoriesArray);
        this.setState({site: school, gradeLevel: gradeLevel});
      }; //end parseOUforSchool()

      const getOU_URL = `${isDev ? "" : "/server" }/getOU`; 

      const getOU_headers = {
          'Content-Type': 'application/json',
          'credentials': 'include',
          'Access-Control-Allow-Origin': '*',
      };
  
      let OU = fetch(getOU_URL, {
          method: 'POST',
          headers: getOU_headers,
          body: JSON.stringify({user: this.state.email})
      }).then((response) => {
          return response.json();     //Parse the JSON of the response
      }).then((OU) => {
        parseOUforSchool(OU);
        this.setState({organizationalUnit:  OU})
      }).catch((error) => {
          console.error(`Catching error:\t ${error}`);
      });
    }; //end getStudentSchool
    
    let getGraphInfo = async () => {
      const headers = new Headers({ 
        'Authorization': `Bearer ${token.accessToken}`,  
        'Content-Type': 'application/json'
      });

      const options = {
        method: "GET",
        headers: headers
      };

      let graphInfo = await fetch(`https://graph.microsoft.com/v1.0/me`, options)
        .then(response =>  response.json() )
        .then(graphInfo => {
          this.setState({graphInfo: (graphInfo)});
          this.setState({ipAddress : graphInfo});
          this.setState({firstName: graphInfo.givenName}); //Set the first name in the state
          this.setState({lastName: graphInfo.surname});  //Set the last name in the state
          this.setState({ email: graphInfo.mail});
          
          
          if (graphInfo.jobTitle !== null) {
            this.setState({ title: graphInfo.jobTitle || "Staff Member" }); 
          } else {
            this.setState({title: "Staff Member"}); 
          }

          if ( (graphInfo.jobTitle !== "Student" || this.state.title !== "Student" ) && graphInfo.officeLocation) {
            this.setState({site: graphInfo.officeLocation}); 
          } else {
            this.setState({isStudent: true});
            getStudentSchool();
          }

          if (graphInfo.businessPhones) {
            this.setState({phoneNumber: graphInfo.businessPhones[0]}); 
          }
        })
        .catch(response => {
          this.setState({graphInfo: response.text()});
          throw new Error(response.text());
        });
    }; //end getGraphInfo()
    
    const token = this.props.accessToken;
    // await authProvider_noDomainHint.getAccessToken();

    getGraphInfo();
  }; //end getUserInfo()
  //*/

    componentDidMount = () => {
        this.props.modifyRootAccountInfo(this.props.accountInfo);
        this.props.changeContainerStyle({"background-image": `none` });

        console.log("PageContent.js window.location.pathname:\t" + window.location.pathname);

        this.setState({pathName: window.location.pathname});
        if (this.props.title === "student" || undefsafe(this.props.location, "state", "renderAsStudent") == "true" || window.location.pathname === "/student") {
            document.title = "CVUHSD | Student Portal"

            this.getUserInfo();
        } else {
            document.title = "CVUHSD | Staff Portal"
        }
    };//end componentDidMount

    componentDidUpdate = () => {
        if (this.props.title.toLowerCase() === "student" ||  undefsafe(this.props.location, "state", "renderAsStudent") == "true" || window.location.pathname === "/student") {
            document.title = "CVUHSD | Student Portal";
        } else {
            document.title = "CVUHSD | Staff Portal";
        }
    }; //end componentDidUpdate
    
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
                            modifyRenderAsStudent={this.props.modifyRenderAsStudent}
                            logOut={this.props.logOut}
                            clearState={this.props.clearState}
                            renderAsStudent={(window.location.pathname === "/student")}
                    />
                            <div className="page-content">
                                { this.generateBlueSections(this.blueSection_objectsArrayProps)} 
                                <Footer 
                                    title={this.props.title}
                                    renderAsStudent={this.props.renderAsStudent}
                                />
                            </div>
                </Fragment>
            );
    }; //end render()
} //end PageContent class


export default PageContent;