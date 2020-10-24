import React, { Component, Fragment } from "react";

import isDev from "isdev";
import undefsafe from "undefsafe";

//Import components
import LoadingSSOPage from "./../LoadingSSOPage/LoadingSSOPage.js";
import Troubleshooting from "./../Troubleshooting/Troubleshooting.js"
import PageContent from "./../PageContent.js";

import {  Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";

//Import styled components
import { StyledContainer } from "./App_StyledComponents.js";

//Import pages
import NotFound from "./../NotFound/NotFound.js";

import PrivateRoute from "./../PrivateRoute.js";

import SimpleStorage, { resetParentState, clearStorage } from "react-simple-storage";

//TODO: To make everything "color agnostic", add change blueSection to just 'sectionRow
//TODO: Make list for student portal
//TODO: Fix Dashboard "digial" typon on quick links buttons

//TODO: Extra thing: Add user profile picture: https://sharepoint.stackexchange.com/questions/215659/how-to-fetch-user-profile-image-from-azure-active-directory-from-sharepoint-onli
//TODO: The hover in the 'All links' in the navbar
//TODO: Fullname state property even logged in as a student still displays the old name
//TODO: Change nav links hover color to same hover color as the logout button

//TODO: Fix the above bug, occurs when you have not cleared the cache or cookies in over a day:
// Request Id: ea3503c9-5058-4f9f-881e-8bbaafd6bd00
// Correlation Id: ba242330-1c92-419e-9913-abde2144a072
// Timestamp: 2020-04-26T19:05:34Z
// Message: AADSTS9000411: The request is not properly formatted. The parameter 'domain_hint' is duplicated.

// TODO: Remove isStudent boolean state variable
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: "",
      accountInfo: "",
      organizationalUnit: "",
     //TODO: Eliminate redudant fullName and first/lastName from state
  
      firstName: "",
      lastName: "",
      fullName: "",
      title: "",
      site: "",
      school: null,
      gradeLevel: null,
      email: "",
      phoneNumber: "",

     isStudent: null,
     renderAsStudent: false,
     pathname: "",
      containerStyle: {
        "background": `linear-gradient(to bottom, #4177a3 0%, #182c3d 100%)`
      } 
    }; //end state object

    // store the component's initial state to reset it
    this.initialState = this.state;
    console.log("Props:\t" + JSON.stringify(this.props) );
  } //end constructor

  changeContainerStyle = (styleObject) => {
    console.log("Change Container Style");
    this.setState({containerStyle: styleObject});
  }; //end changeContainerStyle() function

  modifyLogInStatus = (trueOrFalse) => {
    console.log("modifyLogInStatus() from App.js");
    this.setState({loggedIn: trueOrFalse});
  }; //end modifyLogInStatus()

  modifyStudentStatus = (trueOrFalse) => {
    console.log("modifyStudentStatus() from App.js");
    this.setState({isStudent: trueOrFalse});  
  }; //end modifyFullName()

  modifyFullName = (newName) => {
    console.log("modifyFullName() from App.js");
    this.setState({fullName: newName});  
  }; //end modifyFullName()

  modifyTitle = (newTitle) => {
    console.log("modifyTitle() from App.js");
    this.setState({title: newTitle});  
  }; //end modifyFullName() 

  modifyPathname = (newPathname) => {
    console.log("modifyPathName() from App.js");
    this.setState({pathname: newPathname});  
  };

  modifySite = (newSite) => {
    console.log("modifySite() from App.js");
    this.setState({site: newSite});  
  }; //end modifyFullName()

  modifyRenderAsStudent = (newRenderAsStudent) => { 
    this.setState({renderAsStudent: newRenderAsStudent});
  };

  //TODO: Pass this function down to the logOut() function
  clearState = () => {
    //clearStorage("PortalStorage");
    resetParentState(this, this.initialState);
  };

  logIn = async () => {
    const logOut_URL = `/auth/login`; 

     const logOut_headers = {
         'Content-Type': 'application/json',
         'credentials': 'include',
         'Access-Control-Allow-Origin': '*',
         'redirect' : 'follow'
     };

     let url = await fetch(logOut_URL, {
         method: 'GET',
         headers: logOut_headers,
         "Access-Control-Allow-Credentials": true,
         redirect: 'follow'
     })
     .then((response) => {
        console.dir(response);
         //return response.json(); //Parse the JSON of the response

        // const url = response.response.url;

        // console.log("response url:\t", url);
         
        // return url;

      if (response.redirected) {
         window.location.href = response.url;
      }

        return;
     })
     .catch((error) => {
         console.error(`fetchOUInfo() Catching error:\t ${error}`);
     });

     //window.location = url;
     return;
  }; //end logIn

  logOut = () => {
    this.clearState();
  };

  checkForLogIn = async () => {
    const getOU_URL = `/auth/callback`; 

    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code'); 

    const getOU_headers = {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        'credentials': 'include',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": true
    };

    await fetch(getOU_URL + `?code=${code}`, {
        method: 'GET',
        credentials: "include",
        headers: getOU_headers,
    })
    .then((response) => response.json())
    .then((userInfo) => {

      if (userInfo) {
        /*
          loggedIn: "",
      accountInfo: "",
      organizationalUnit: "",
     //TODO: Eliminate redudant fullName and first/lastName from state
  
      firstName: "",
      lastName: "",
      fullName: "",
      title: "",
      site: "",
      school: null,
      gradeLevel: null,
      email: "",
      phoneNumber: "",
        */

        const { email, family_name, givenName, jobTitle} = userInfo;
        
        this.setState({
          loggedIn: true,
          firstName:  givenName,
          lastName: family_name,
          email: email
        });
      }

      console.dir(userInfo); 

      
    })
    .catch((error) => {
        console.error(`fetchOUInfo() Catching error:\t ${error}`);
    });
  };

  modifyRootAccountInfo = (newAccountInfo) => {
    console.log("updateRootAccountInfo()");
    this.setState({accountInfo: newAccountInfo});
  };

  componentDidMount = () => {
    //this.getUserInfo(); 

    console.log("App.js window.location.pathname:\t" + window.location.pathname);
    console.log("App.js window.location.pathname true student:\t" + (window.location.pathname === "/student") );
    console.log("Route render window.location.pathname:\t" + window.location.pathname !== "/staff");
    
    this.setState({pathname: window.location.pathname});

    this.setState({title: (this.state.pathname === "/student" || window.location.pathname === "/" ) ? "student" : "staff" });
  
    if (window.location.pathname === "/callback") {
      this.checkForLogIn();
    }

    if (window.location.pathname === "/") {
      this.logIn();
    }

    //require("./SDPChat.js");
  
  }; //end componentDidMount

  componentDidUpdate = () => {
    const favicon = document.getElementById("favicon");
    
    if (this.state.title === "Student" || this.state.renderAsStudent) {
      favicon.href = "./images/CV-600x600-portal-red.png";
    } else {
      favicon.href = "./images/CV-600x600-portal.png";
    }
  }; //end componentDidUpdate()

  render = () => {
    let publicURL = ""; //process.env.PUBLIC_URL;

    let defaultURL = ( window.location.pathname === "/student" || window.location.pathname === "/" || (this.state.title.toLowerCase() === "student" ) || undefsafe(this.props.location, "state", "renderAsStudent") == "true" ) ? "student" : "staff";
    console.log("defaultURL:\t" + defaultURL);

    return (
      <StyledContainer 
        fluid={true} 
        containerStyle={this.state.containerStyle} 
        districtPosition={this.state.title}
        renderAsStudent={this.state.renderAsStudent}
      >
        <SimpleStorage parent={this} prefix={"PortalStorage"} />
        {
          this.state.loggedIn ? (
            <Switch>
              { // Update routes to use server subdirectory in production
                //Source: https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1   
              }
              <Route exact path={`${publicURL}/` || `${publicURL}/staff.html` || `${publicURL}/student.html`}
                render={ () => {
                    return (<Redirect to={`${publicURL}/${defaultURL}`} />);
                    }
                } 
              />
              <PrivateRoute path={`${publicURL}/${defaultURL}`}
                            loggedIn={"true"}
                            fullName={this.state.firstName + " " + this.state.lastName}
                            isStudent={this.state.isStudent}
                            title={this.state.title}
                            site={this.state.site}
                            gradeLevel={this.state.gradeLevel}
                            renderAsStudent={this.state.renderAsStudent}
                            modifyPathname={this.modifyPathname}
                            modifyRenderAsStudent={this.modifyRenderAsStudent}
                            modifyLogInStatus={this.modifyLogInStatus} 
                            modifyStudentStatus={this.modifyStudentStatus}
                            modifyFullName={this.modifyFullName}
                            modifyTitle={this.modifyTitle}
                            modifySite={this.modifySite}
                            changeContainerStyle={this.changeContainerStyle} 
                            logOut={this.logout}
                            clearState={this.clearState}
                            accountInfo={this.state.accountInfo}
                            modifyRootAccountInfo={this.modifyRootAccountInfo}
                            component={ PageContent} 
              />

              <Route path={`${publicURL}/staff`}
                      render={ () => {
                          return (<Redirect to={`${publicURL}/${defaultURL}`} />);
                      }
                  } 
              />
              <Route path={`${publicURL}/staff.html`}
                      render={ () => {
                          return (<Redirect to={`${publicURL}/staff`} />);
                      }
                  } 
              /> 
              <Route path={`${publicURL}/student`}
                      render={ () => {
                          return (<Redirect to={`${publicURL}/${defaultURL}`} />);
                      }
                  } 
              />
              <Route path={`${publicURL}/student.html`}
                      render={ () => {
                          return (<Redirect to={`${publicURL}/student`} />);
                      }
                  } 
              />
                <Route path={`${publicURL}/troubleshooting`} 
                      render={() => { return (<Troubleshooting/>)}}
                
              />
              {
                (this.state.pathname !== "/student" || window.location.pathname !== "/student") ||
                (this.state.pathname !== "/staff" || window.location.pathname !== "/student") ||
                (this.state.pathname !== "/troubleshooting" || window.location.pathname !== "/troubleshooting") ?   
                  (<PrivateRoute 
                      loggedIn={"true"}
                      fullName={this.state.firstName + " " + this.state.lastName}
                      isStudent={this.state.isStudent}
                      title={this.state.title}
                      site={this.state.site}
                      gradeLevel={this.state.gradeLevel}
                      renderAsStudent={this.state.renderAsStudent}
                      modifyPathname={this.modifyPathname}
                      modifyRenderAsStudent={this.modifyRenderAsStudent}
                      modifyLogInStatus={this.modifyLogInStatus} 
                      modifyStudentStatus={this.modifyStudentStatus}
                      modifyFullName={this.modifyFullName}
                      modifyTitle={this.modifyTitle}
                      modifySite={this.modifySite}
                      changeContainerStyle={this.changeContainerStyle} 
                      logOut={this.logout}
                      clearState={this.clearState}
                      accountInfo={this.state.accountInfo}
                      modifyRootAccountInfo={this.modifyRootAccountInfo}
                      defaultURL={defaultURL}
                      component={ NotFound } /> ) 
                    : null
              }
          </Switch>
          ) : <LoadingSSOPage/>
        }
          
        
      </StyledContainer>); //end return statement
  }
}

export default App;
