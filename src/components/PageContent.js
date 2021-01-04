import React, { Fragment, Component, useEffect, useState } from "react";

//Import 3rd party modules
import ReactLoading from "react-loading";
import styled from "styled-components";

import isDev from 'isdev';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

//Import App components
import BlueSection from "./BlueSection/BlueSection.js";
import Header from "./Header/Header.js";

//Import list of buttons
import { blueSectionInfo_Staff , redSectionInfo_Student } from "./../objectFiles/blueSectionInfo.js";

import undefsafe from "undefsafe";

import Footer from "./Footer/Footer.js";

//TODO: Bug -- Changing from the staff to the student portal does not change the page title.
//TODO: Save passed props from <Redirect> into state.
//TODO: Enlarge the All links embedded google sheet
//TODO: Use undefsafe to add this.props.location.state as part of "portal switching". ALso find if this really necessary.


const PageContentLoading = styled("div")`
    margin: 0 auto;
`;

const PageContent = ({ fullName, email, title, uid, site, renderAsStudent, gradeLevel, location, username, accessToken, clearState, logOut, changeContainerStyle, modifySite, modifyGradeLevel, modifyTitle, modifyRenderAsStudent, modifyIsStudent, notify }) => {
  //let [ renderAsStudentTwo, setRenderAsStudent ] = useState(renderAsStudent || location.state.renderAsStudent);
  //undefsafe(this.props, "renderAsStudent") || undefsafe(this.props.location, "state", "renderAsStudent") || "";
  
  let sectionInfoObject = (title === "Student" ||  window.location.pathname === "/student") ? 
                              redSectionInfo_Student : blueSectionInfo_Staff;
  
  let blueSection_objectsArrayProps = {
      blueSection_objectsArray: sectionInfoObject
  };


  const getUserInfo = () => {
    console.log("getUserInfo()");

    const parseOUforSchool = async (organizationalUnit) => {
      console.log("parseOUforSchool()");
      let splitDirectoriesArray = organizationalUnit.split("/");

      let school = splitDirectoriesArray[1];
      let gradeLevel = splitDirectoriesArray[2];

      modifySite(school); //TODO: this should be a separate function, modifySchool
      modifyGradeLevel(gradeLevel);
    }; //end parseOUforSchool()

    const getStudentSchool = async () => {
      console.log("getStudentSchool()");

      const getOU_URL = `${isDev ? "" : "/server" }/getOU`; 

      const getOU_headers = {
          'Content-Type': 'application/json',
          'credentials': 'include',
          'Access-Control-Allow-Origin': '*',
      };
  
      const OU = await fetch(getOU_URL, {
          method: 'POST',
          headers: getOU_headers,
          body: JSON.stringify({user: username})
      }).then((response) => {
          return response.json();     //Parse the JSON of the response
      }).then((OU) => OU).catch((error) => {
          console.error(`Catching error:\t ${error}`);
      });

      parseOUforSchool(OU);
    }; //end getStudentSchool
    
    const getGraphInfo = async (accessToken) => {
      const headers = new Headers({ 
        'Authorization': `Bearer ${accessToken}`,  
        'Content-Type': 'application/json'
      });

      const options = {
        method: "GET",
        headers: headers
      };

      let graphInfo = await fetch(`https://graph.microsoft.com/v1.0/me`, options)
        .then(response =>  response.json() )
        .then(graphInfo => {
          

          if ( (graphInfo.jobTitle !== "Student" || this.state.title !== "Student" ) && graphInfo.officeLocation) {
            modifySite(graphInfo.officeLocation)
          } else {
            modifyIsStudent(true);
            getStudentSchool();
          }

          // if (graphInfo.businessPhones) {
          //   this.setState({phoneNumber: graphInfo.businessPhones[0]}); 
          // }
        })
        .catch(response => {
          throw new Error(response.text());
        });
    }; //end getGraphInfo()
    
    getGraphInfo(accessToken);
  }; //end getUserInfo()

  const LoadingSkeletons = () => {
    return(
      <Fragment>
        <Skeleton height="60px"   width="99%"/>
        <Skeleton height="60px"   width="99%"/>
        <Skeleton height="60px"   width="99%"/>
        <Skeleton height="60px"   width="99%"/>
        <Skeleton height="60px"   width="99%"/>
        <Skeleton height="60px"   width="99%"/>
        <Skeleton height="60px"   width="99%"/>
        <Skeleton height="60px"   width="99%"/>
        <Skeleton height="60px"   width="99%"/>
        <Skeleton height="60px"   width="99%"/>
      </Fragment>
    ); //end return statement 
  }; //end LoadingSkeletons component

  const generateBlueSections = (blueSection_objectsArrayProps) => {
    const loadPage = false;

    if (title) {
        return blueSection_objectsArrayProps.blueSection_objectsArray.map( (blueSection_Object, index) => {

          let { blueSectionName, expanded, headerTitle, buttonRowID, buttons } = blueSection_Object;

          return (
              <BlueSection 
                  blueSectionName = { blueSectionName }
                  expanded        = { expanded }
                  headerTitle     = { headerTitle }
                  buttonRowID     = { buttonRowID }
                  buttons         = { buttons }
                  key             = { index }
                  title           = { title || "Student"  }
                  renderAsStudent = { (window.location.pathname === "/student") }
              />
          ); //end return statement
      }); //end outer return statement
    } else {
      return (<LoadingSkeletons/>); //end return statement
    } //end if-else statement
}; //end generateBlueSections()

  useEffect(() => {
    changeContainerStyle({"background-image": `none` });

    if ( (title === "Student" || ( undefsafe(location, "state", "renderAsStudent") == "true" && title === "Student")|| window.location.pathname === "/student" && title === "Student") && !gradeLevel) {
        getUserInfo();
    } //end if-statement
  }, [ title, location, email ]); //end useEffect

  const showFooter = false;

  return (
    <SkeletonTheme 
      color           = {
                          title ?
                            ( (title === "student") || renderAsStudent === true || window.location.pathname === "/student") ? 
                                " rgba(147, 30, 29, 0.21)": "rgba(30, 108, 147, 0.21);"
                            : "rgba(147, 30, 29, 0.21)" 
                        }
      highlightColor  = {
                          title ?
                            ( (title === "student") || renderAsStudent === true || window.location.pathname === "/student") ? 
                                " rgba(147, 30, 29, 0.5)": "rgba(30, 108, 147, 0.5);"
                            : "rgba(147, 30, 29, 0.5)" 
      }
    >
        <Header 
                districtName          = "CVUHSD" 
                headerTitle           = "S.S.O. Portal" 
                fullName              = { fullName || "CVUHSD User"}
                email                 = { email } 
                title                 = { title }
                uid                   = { uid }
                site                  = { site  }
                gradeLevel            = { gradeLevel }

                modifyTitle           = { modifyTitle }
                modifySite            = { modifySite }
                modifyRenderAsStudent = { modifyRenderAsStudent}
                logOut                = { logOut}
                clearState            = { clearState}
                renderAsStudent       = { (window.location.pathname === "/student") }
                notify                = { notify }
        />
                <div className="page-content" style={{textAlign: "center"} }>
                    { generateBlueSections(blueSection_objectsArrayProps) } 
                    { 
                      title ? (
                        <Footer 
                          title           = { title }
                          renderAsStudent = { renderAsStudent }
                        />
                      ) : ( <Skeleton height="24px" width="99%"/>)
                    }
                </div>
    </SkeletonTheme>
  ); //end return statement
}; //end PageContent

export default PageContent;