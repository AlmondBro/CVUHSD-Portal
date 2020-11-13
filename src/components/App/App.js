import React, { Component } from "react";

import isDev from 'isdev';
import undefsafe from "undefsafe";


import {  Redirect } from "react-router";
import { withRouter, Route, Switch } from "react-router-dom";

import { withCookies } from 'react-cookie';

import SimpleStorage, { resetParentState, clearStorage } from "react-simple-storage";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { isIE } from './../../utilityFunctions.js';

//Import components
import LoadingSSOPage from "./../LoadingSSOPage/LoadingSSOPage.js";
import Troubleshooting from "./../Troubleshooting/Troubleshooting.js"
import PageContent from "./../PageContent.js";

//Import pages
import NotFound from "./../NotFound/NotFound.js";

import PrivateRoute from "./../PrivateRoute.js";

//Import styled components
import { StyledContainer, StyledToastContainer } from "./App_StyledComponents.js";


//TODO: To make everything "color agnostic", add change blueSection to just 'sectionRow
//TODO: Make list for student portal
//TODO: Fix Dashboard "digital" typon on quick links buttons

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
      organizationalUnit: "",
     //TODO: Eliminate redudant fullName and first/lastName from state
  
      firstName: "",
      lastName: "",
      fullName: "",
      title: "",
      site: "",

      school: null,
      gradeLevel: null,

      username: "",
      email: "",
      phoneNumber: "",

      isStudent: null,
      renderAsStudent: false,
      pathname: "",
      accessToken: "",
      uid: "",
      containerStyle: {
          "background": `linear-gradient(to bottom, #4177a3 0%, #182c3d 100%)`
      } 
    }; //end state object

    // store the component's initial state to reset it
    this.initialState = this.state;
  } //end constructor

  changeContainerStyle = (styleObject) => {
    console.log("Change Container Style");
    this.setState({containerStyle: styleObject});
  }; //end changeContainerStyle() function

  modifyLogInStatus = (trueOrFalse) => {
    console.log("modifyLogInStatus() from App.js");
    this.setState({loggedIn: trueOrFalse});
  }; //end modifyLogInStatus()

  modifyIsStudent = (trueOrFalse) => {
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

  modifyGradeLevel = (newGradeLevel) => {
    console.log("modifGradeLevel() from App.js");
    this.setState({ gradeLevel: newGradeLevel });  
  }; //end modifyFullName()

  modifyRenderAsStudent = (newRenderAsStudent) => { 
    this.setState({renderAsStudent: newRenderAsStudent});
  };

  //TODO: Pass this function down to the logOut() function
  clearState = () => {
    resetParentState(this, this.initialState);
    clearStorage("PortalStorage");
  };

  loginIE = async() => {
    const logInIE_URL = `${isDev ? "" : "/server"}/auth/login-ie`; 

    const logInIE_headers = {
        'Content-Type': 'application/json',
        'credentials': 'include',
        'redirect' : 'follow'
    };

    return await fetch(logInIE_URL, {
        method: 'GET',
        headers: logInIE_headers,
        "Access-Control-Allow-Credentials": true,
    })
    .then((response) => response.json())
    .then((returnObject) => {
      let { url } = returnObject;
      window.location.href = url;
     
       return;
    })
    .catch((error) => {
        console.error(`loginIE() Catching error:\t ${error}`);
    });
  }; //end loginIE

  logIn = async () => {
    const logIn_URL = `${isDev ? "" : "/server"}/auth/login`; 

     const logIn_headers = {
         'Content-Type': 'application/json',
         'credentials': 'include',
         'redirect' : 'follow'
     };

     return await fetch(logIn_URL, {
         method: 'GET',
         headers: logIn_headers,
         "Access-Control-Allow-Credentials": true,
     })
     .then((response) => {
        if (response.redirected) {
          //TODO: Use the react router library to push this mechanism

          let { url } = response;
          window.location.href = url;
        }

        return;
     })
     .catch((error) => {
         console.error(`fetchOUInfo() Catching error:\t ${error}`);
     });
  }; //end logIn

  logOut = async () => {
    const logOut_URL = `${isDev ? "" : "/server"}/auth/logout`;

    const logOut_headers = {
        'credentials': 'include',
        "Access-Control-Allow-Credentials": true
    };

    return await fetch(logOut_URL, {
        method: 'GET',
        credentials: "include",
        headers: logOut_headers,
    })
    .then((response) => {
       if (response.redirected) {
         const { url } = response;
         window.location.href = url;
       }
       return ;
    })
    .catch((error) => {
        console.error(`logOut() Catching error:\t ${error}`);
    });
  }; //end logOut

  checkForLogIn = async (history) => {
    const checkForLogin_URL = `${isDev ? "" : "/server"}/auth/callback`; 

    const successfulAuthURL = `${isDev ? "" : ""}/auth-success`; 

    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code'); 

    const checkForLogin_headers = {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        'credentials': 'include',
        "Access-Control-Allow-Credentials": true
    };

    return await fetch(checkForLogin_URL + `?code=${code}`, {
        method: 'GET',
        credentials: "include",
        headers: checkForLogin_headers,
    })
    .then((response) => response.json())
    .then((userInfo) => {
      if (userInfo) {
        const { username, email, family_name, givenName, jobTitle, accessToken, uid } = userInfo;
    
        this.setState({
          loggedIn: true,
          firstName:  givenName,
          lastName: family_name,
          username: username,
          email: email,
          title: jobTitle || "staff",
          uid,
          accessToken,
        });
      }
    })
    .then(() => {
      if (window.location.pathname === successfulAuthURL) {
        //window.location.href = `http://${isDev ? "localhost:3000" : productionDomain}/staff`;
        history.push(`/`);

      } 
    })
    .catch((error) => {
        console.error(`checkForLogIn() Catching error:\t ${error}`);
    });
  };

  notify = (notifyContent) => {
    toast(notifyContent, {
        position: "top-right",
        autoClose: 12500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    return;
  };

  componentDidMount = () => {
    let { history, cookies } = this.props;

    const accessTokenCookie = cookies.get("accessToken");
    
    //if (!accessTokenCookie) {
      if ( !this.state.loggedIn && ( (window.location.pathname === "/auth-success") ) ) {
        this.checkForLogIn(history);
      }
  
      if (!this.state.loggedIn && !this.state.title && (window.location.pathname !== "/auth-success") ) {
        if (isIE) {
          console.log("loginIE response");
          this.loginIE();
        } else {
          this.logIn();
        } //end inner else-statement, checking if the login is IE
      } //end if-statement checking if the route is not auth-success
    //} //end outer if-statement checking for cookies


    const favicon = document.getElementById("favicon");

    if (this.state.title === "Student" || this.state.renderAsStudent || window.location.pathname === "/student") {
      favicon.href = "./images/CV-600x600-portal-red.png";
      document.title = "CVUHSD | Student Portal"
    } else {
      favicon.href = "./images/CV-600x600-portal.png";
      document.title = "CVUHSD | Staff Portal"
    }
    // require("./SDPChat.js");
  
  }; //end componentDidMount

  componentDidUpdate = () => {
    const favicon = document.getElementById("favicon");
    
    if (this.state.title === "Student" || this.state.renderAsStudent || window.location.pathname === "/student") {
      favicon.href = "./images/CV-600x600-portal-red.png";
      document.title = "CVUHSD | Student Portal"
    } else {
      favicon.href = "./images/CV-600x600-portal.png";
      document.title = "CVUHSD | Staff Portal"
    }
  }; //end componentDidUpdate()

  render = () => {
    let publicURL = ""; //process.env.PUBLIC_URL;

    let defaultURL = this.state.title ? (this.state.title.toLowerCase() === "student" ? "student" : "staff") : "staff";
    // ( window.location.pathname === "/student" || window.location.pathname === "/" || (this.state.title.toLowerCase() === "student" ) || undefsafe(this.props.location, "state", "renderAsStudent") == "true" ) ? "student" : "staff";

    console.log("defaultURL:\t" + defaultURL);

    const showPage = false;
    return (
      <StyledContainer 
        fluid={true} 
        containerStyle    = { this.state.containerStyle} 
        districtPosition  = { this.state.title}
        renderAsStudent   = { this.state.renderAsStudent}
      >
        <StyledToastContainer
          position          = "top-right"
          autoClose         = { 1200 }
          hideProgressBar   = { true }
          newestOnTop       = { false }
          closeOnClick      = { true }
          rtl               = { false }
          pauseOnFocusLoss  = { false }
          draggable         = { true }
          pauseOnHover      = { true }

          districtPosition  = { this.state.title.toLowerCase() }
          renderAsStudent   = { this.state.renderAsStudent}
        />
        <SimpleStorage parent={this} prefix={"PortalStorage"} />
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
              <PrivateRoute 
                            path                  = {  [`${publicURL}/${defaultURL}`, `${publicURL}/student`, `${publicURL}/staff`, `${publicURL}/auth-success`]}
                            component             = { PageContent} 

                            fullName              = { this.state.firstName + " " + this.state.lastName }
                            email                 = { this.state.email }
                            uid                   = { this.state.uid }
                            title                 = { this.state.title }
                            site                  = { this.state.site }
                            renderAsStudent       = { this.state.renderAsStudent }
                            gradeLevel            = { this.state.gradeLevel }
                            location              = { this.props.location }
                            username              = { this.state.username }
                            accessToken           = { this.state.accessToken }
                            clearState            = { this.clearState }
                            logOut                = { this.logOut}
                            changeContainerStyle  = { this.changeContainerStyle }

                            modifySite            = { this.modifySite }
                            modifyGradeLevel      = { this.modifyGradeLevel }
                            modifyTitle           = { this.modifyTitle }
                            modifyRenderAsStudent = { this.modifyRenderAsStudent }
                            modifyIsStudent       = { this.modifyIsStudent }

                            notify                = { this.notify }
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
                          return (<Redirect to={`${publicURL}/${"student"}`} />);
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
                (window.location.pathname !== "/staff") || (window.location.pathname !== "/student") 
                || (window.location.pathname !== "/troubleshooting") ?   
                  (<PrivateRoute 
                      component             = { NotFound } 
                      path                  = { [`${publicURL}/${defaultURL}`, `${publicURL}/student`, `${publicURL}/staff`, `${publicURL}/auth-success`]}
                      
                      defaultURL            = { defaultURL }

                      history               = { this.props.history }
                      fullName              = { this.state.firstName + " " + this.state.lastName }
                      title                 = { this.state.title }
                      site                  = { this.state.site }
                      gradeLevel            = { this.state.gradeLevel }
                      clearState            = { this.clearState }
                      logOut                = { this.logOut}
                      changeContainerStyle  = { this.changeContainerStyle }

                      modifySite            = { this.modifySite }
                      modifyTitle           = { this.modifyTitle }
                      modifyRenderAsStudent = { this.modifyRenderAsStudent }
                    /> ) : null
              }
          </Switch>
      </StyledContainer>); //end return statement
  }
}

export default withRouter(withCookies(App));
