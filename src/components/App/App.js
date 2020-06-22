import React, { Component, Fragment } from "react";

import isDev from "isdev";
import undefsafe from "undefsafe";

import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider, authProvider_noDomainHint } from "./../../authProvider.js";

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

  logOut = () => {
    this.clearState();
  };

  modifyRootAccountInfo = (newAccountInfo) => {
    console.log("updateRootAccountInfo()");
    this.setState({accountInfo: newAccountInfo});
  };

  getUserInfo = async () => {
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
    
    console.log("getUserInfo()");
    const token = await authProvider_noDomainHint.getAccessToken();

    getGraphInfo();

  }; //end getUserInfo()

  componentDidMount = () => {
    this.getUserInfo(); 

    console.log("App.js window.location.pathname:\t" + window.location.pathname);
    console.log("App.js window.location.pathname true student:\t" + (window.location.pathname === "/student") );
    console.log("Route render window.location.pathname:\t" + window.location.pathname !== "/staff");
    
    this.setState({pathname: window.location.pathname});
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

    let defaultURL = ( window.location.pathname === "/student" || (this.state.title.toLowerCase() === "student" ) || undefsafe(this.props.location, "state", "renderAsStudent") == "true" ) ? "student" : "staff";
    console.log("defaultURL:\t" + defaultURL);

    return (
      <StyledContainer 
        fluid={true} 
        containerStyle={this.state.containerStyle} 
        districtPosition={this.state.title}
        renderAsStudent={this.state.renderAsStudent}
      >
        <SimpleStorage parent={this} prefix={"PortalStorage"} />
        <AzureAD provider={this.state.title ? authProvider_noDomainHint : authProvider } forceLogin={true}>
          {
            ({ login, logout, accountInfo, authenticationState, error }) => {
              //console.log("Account info:\t" + JSON.stringify(accountInfo));

                switch (authenticationState) {
                  case AuthenticationState.Authenticated:
                  // if (this.state.title) {
                      return (
                        <Fragment>
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
                                            loggedIn={AuthenticationState.Authenticated}
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
                                            logOut={logout}
                                            clearState={this.clearState}
                                            accountInfo={accountInfo}
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
                                      loggedIn={AuthenticationState.Authenticated}
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
                                      logOut={logout}
                                      clearState={this.clearState}
                                      accountInfo={accountInfo}
                                      modifyRootAccountInfo={this.modifyRootAccountInfo}
                                      defaultURL={defaultURL}
                                      component={ NotFound } /> ) 
                                    : null
                              }
                          </Switch>
                        </Fragment> );
                  
                  case AuthenticationState.Unauthenticated:
                    return (<LoadingSSOPage message="Loading CVUHSD Single Sign On Page"/>);
                  
                  case AuthenticationState.Error:
                    return (
                      (<LoadingSSOPage 
                        error
                        title={this.state.title}
                        renderAsStudent={this.state.renderAsStudent}
                      />)
                    );

                  case error: 
                      return  (
                        (<LoadingSSOPage
                           error
                           title={this.state.title}
                           renderAsStudent={this.state.renderAsStudent}
                        />)
                      );
                  default: 
                    return (<LoadingSSOPage 
                              message="Loading CVUHSD Single Sign On Page..." 
                              title={this.state.title}
                              renderAsStudent={this.state.renderAsStudent}
                            />);
                } //end switch

            } //function with switch cases
          }
        </AzureAD> 
      </StyledContainer>); //end return statement
  }
}

export default App;
