import React, { Component, Fragment } from "react";

import isDev from "isdev";
import undefsafe from "undefsafe";

import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider, authProvider_noDomainHint } from "./../../authProvider.js";

//Import components
import LoadingSSOPage from "./../LoadingSSOPage/LoadingSSOPage.js";
import Troubleshooting from "./../Troubleshooting/Troubleshooting.js"
import PageContent from "../PageContent.js";

import {  Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";

//Import styledcomponents
import { StyledContainer } from "./App_StyledComponents.js";

//Import pages
import LogIn from "./../LogIn/LogIn.js";
import NotFound from "./../NotFound/NotFound.js";

import PrivateRoute from "./../PrivateRoute.js";

import SimpleStorage, { resetParentState, clearStorage } from "react-simple-storage";

//TODO: To make everything "color agnostic", add change blueSection to just 'sectionRow
//TODO: Make list for student portal
//TODO: Fix Dashboard "digial" typon on quick links buttons
//TODO: H ave a different link for the student and staff portals
//TODO: Eliminate the flashing when going into the login page

//TODO: Extra thing: Add user profile picture: https://sharepoint.stackexchange.com/questions/215659/how-to-fetch-user-profile-image-from-azure-active-directory-from-sharepoint-onli
//TODO: The hover in the 'All links' in the navbar
//TODO: Fullname state property even logged in as a student still displays the old name
//TODO: Change nav links hover color to same hover color as the logout button
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

  isAuthenticated = () => {
    //event.preventDefault();
    console.log("Checking if authenticated...");

    let logIn_URL = `${isDev ? "" : "/server" }/isloggedin`

    this.setState({isLoading: true, message: "Loading..."});

    //let isDev = false;
    let headers = {
        'Content-Type': 'application/json',
        'credentials': 'include',
        'Access-Control-Allow-Origin': '*',
    };

    fetch(logIn_URL, {
        method: 'GET',
        headers: headers,
    }).then((response) => {
        return response.json();
    }).then((response) => {
        console.log("App.js fetch block 1");
        console.log("Response:!!\t" + JSON.stringify(response) );
        response.Authenticated ? this.modifyLogInStatus(true) : this.modifyLogInStatus(null);
    }).catch((err) => {
        console.log(`Catching error:\t ${err}`);
    });
};

  modifyRootAccountInfo = (newAccountInfo) => {
    console.log("updateRootAccountInfo()");
    this.setState({accountInfo: newAccountInfo});
  };

  getUserInfo = async () => {
    console.log("getUserInfo()");

    const token = await authProvider_noDomainHint.getAccessToken();

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
          this.setState({firstName: graphInfo.givenName}); //Set the first name in the state
          this.setState({lastName: graphInfo.surname});  //Set the last name in the state
          this.setState({ email: graphInfo.mail});
          
          
          if (graphInfo.jobTitle) {
            this.setState({title: graphInfo.jobTitle}); 
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
    
    getGraphInfo();

  }; //end getUserInfo()

  componentDidMount = () => {
   // this.isAuthenticated();
    this.getUserInfo(); 
    console.log("App.js window.location.pathname:\t" + window.location.pathname);
    console.log("App.js window.location.pathname true student:\t" + (window.location.pathname === "/student") );
    console.log("Route render window.location.pathname:\t" + window.location.pathname !== "/staff");
    this.setState({pathname: window.location.pathname});

   
    //console.log("Graph info:\t" + JSON.stringify(graphInfo) );
  };

  componentDidUpdate = () => {
 
  }; //end componentDidUpdate

  render = () => {
    let publicURL = ""; //process.env.PUBLIC_URL;

    let defaultURL = ( window.location.pathname === "/student" || (this.state.title.toLowerCase() === "student" ) || undefsafe(this.props.location, "state", "renderAsStudent") == "true" ) ? "student" : "staff";
    console.log("defaultURL:\t" + defaultURL);

    return (
      <StyledContainer fluid={true} containerStyle={this.state.containerStyle} >
        <SimpleStorage parent={this} prefix={"PortalStorage"} />
        <AzureAD provider={authProvider} forceLogin={true}>
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
                              <Route path={`${publicURL}/login`} 
                                    render={ (props) => <LogIn  {...props} 
                                                                loggedIn={ this.state.loggedIn}
                                                                fullName={this.state.firstName + " " + this.state.lastName}
                                                                isStudent={this.state.isStudent}
                                                                title={this.state.title}
                                                                renderAsStudent={this.state.renderAsStudent}
                                                                modifyRenderAsStudent={this.modifyRenderAsStudent}
                                                                modifyLogInStatus={this.modifyLogInStatus} 
                                                                modifyStudentStatus={this.modifyStudentStatus}
                                                                modifyFullName={this.modifyFullName}
                                                                modifyTitle={this.modifyTitle}
                                                                modifySite={this.modifySite}
                                                                changeContainerStyle={this.changeContainerStyle} 
                                                                clearState={this.clearState}
                                                          /> 
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
                                          
                                            // renderAsStudent={true}
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
                                  (<Route component={ NotFound } /> ) 
                                    : null
                              }
                          </Switch>
                        </Fragment> );
                  
                  case AuthenticationState.Unauthenticated:
                    return (<LoadingSSOPage message="Loading CVUHSD Single Sign On Page"/>);
                  
                  case AuthenticationState.Error:
                    return (
                      (<LoadingSSOPage error/>)
                    );

                  case error: 
                      return  (
                        (<LoadingSSOPage error/>)
                      );
                  default: 
                    return (<LoadingSSOPage message="Loading CVUHSD Single Sign On Page"/>);
                } //end switch

            } //function with switch cases
          }
        </AzureAD>
        <Switch>
          {/* TODO: Add logic to redirect to staff/student if you input .html */}
          <Route exact path={`${publicURL}/` || `${publicURL}/staff.html` || `${publicURL}/student.html`}
                                  render={ () => {
                                      return (<Redirect to={`${publicURL}/${defaultURL}`} />);
                                  }
                              } 
          />
          {/* <Route path={`${publicURL}/troubleshooting`} 
            render={() => { return <Troubleshooting/>}}
            // component={Troubleshooting}
          /> */}
        </Switch>
      </StyledContainer>); //end return statement
  }
}

export default App;
