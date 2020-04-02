import React, { Component } from 'react';


import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider, authProvider_noDomainHint } from './../../authProvider.js';

//Import components
import PageContent from "../PageContent.js";

import isDev from 'isdev';

import {  Redirect } from 'react-router'
import { Route, Switch } from "react-router-dom";

//Import styledcomponents
import { StyledContainer } from "./App_StyledComponents.js";

//Import pages
import LogIn from "./../LogIn/LogIn.js";
import NotFound from './../NotFound.js';

import PrivateRoute from "./../PrivateRoute.js";

import SimpleStorage, { resetParentState, clearStorage } from "react-simple-storage";


//TODO: Have /staff.html redirect to /staff

//TODO: To make everything "color agnostic", add change blueSection to just 'sectionRow
//TODO: Make list for student portal
//TODO: Fix Dashboard "digial" typon on quick links buttons
//TODO: Have a different link for the student and staff portals
//TODO: Eliminate the flashing when going into the login page

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

  modifySite = (newSite) => {
    console.log("modifySite() from App.js");
    this.setState({site: newSite});  
  }; //end modifyFullName()


  //TODO: Pass this function down to the logOut() function
  clearState = () => {
    clearStorage("PortalStorage");
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
            //TODO: Call API to get the OU and parse it
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

    //console.log("Graph info:\t" + JSON.stringify(graphInfo) );
  };

  render = () => {
    let publicURL = ""; //process.env.PUBLIC_URL;
    return (
      <AzureAD provider={authProvider} forceLogin={true}>
        {
          ({login, logout, accountInfo, authenticationState, error }) => {
            //console.log("Account info:\t" + JSON.stringify(accountInfo));

            return (
              <StyledContainer fluid={true} containerStyle={this.state.containerStyle} >
                <SimpleStorage parent={this} prefix={"PortalStorage"} />
                <Switch>
                    { // Update routes to use server subdirectory in production
                      //Source: https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1   
                    }
                    {/* TODO: Add logic to redirect to staff/student if you input .html */}
                    <Route exact path={`${publicURL}/` || `${publicURL}/staff.html` || `${publicURL}/student.html`}
                            render={ () => {
                                return (<Redirect to={`${publicURL}/staff`} />);
                            }
                        } 
                    />
                    <Route path={`${publicURL}/login`} 
                          render={ (props) => <LogIn  {...props} 
                                                      loggedIn={ this.state.loggedIn}
                                                      fullName={this.state.firstName + " " + this.state.lastName}
                                                      isStudent={this.state.isStudent}
                                                      title={this.state.title}
                                                      modifyLogInStatus={this.modifyLogInStatus} 
                                                      modifyStudentStatus={this.modifyStudentStatus}
                                                      modifyFullName={this.modifyFullName}
                                                      modifyTitle={this.modifyTitle}
                                                      modifySite={this.modifySite}
                                                      changeContainerStyle={this.changeContainerStyle} 
                                                /> 
                                  } 
                    />
                    <PrivateRoute path={`${publicURL}/staff`}
                                  loggedIn={AuthenticationState.Authenticated}
                                  fullName={this.state.firstName + " " + this.state.lastName}
                                  isStudent={this.state.isStudent}
                                  title={this.state.title}
                                  site={this.state.site}
                                  modifyLogInStatus={this.modifyLogInStatus} 
                                  modifyStudentStatus={this.modifyStudentStatus}
                                  modifyFullName={this.modifyFullName}
                                  modifyTitle={this.modifyTitle}
                                  modifySite={this.modifySite}
                                  changeContainerStyle={this.changeContainerStyle} 
                                  logOut={logout}
                                  accountInfo={accountInfo}
                                  modifyRootAccountInfo={this.modifyRootAccountInfo}
                                  component={ PageContent} 
                                 
                                  // renderAsStudent={true}
                    />

                    <PrivateRoute path={`${publicURL}/student`}
                                  loggedIn={AuthenticationState.Authenticated}
                                  fullName={this.state.firstName + " " + this.state.lastName}
                                  isStudent={this.state.isStudent}
                                  title={this.state.title}
                                  site={this.state.site}
                                  modifyLogInStatus={this.modifyLogInStatus} 
                                  modifyStudentStatus={this.modifyStudentStatus}
                                  modifyFullName={this.modifyFullName}
                                  modifyTitle={this.modifyTitle}
                                  modifySite={this.modifySite}
                                  changeContainerStyle={this.changeContainerStyle} 
                                  logOut={logout}
                                  modifyRootAccountInfo={this.modifyRootAccountInfo}
                                  accountInfo={accountInfo}
                                  component={ PageContent} 
                    />
                      <Route path={`${publicURL}/student.html`}
                            render={ () => {
                                return (<Redirect to={`${publicURL}/student`} />);
                            }
                        } 
                    />
                        <Route path={`${publicURL}/staff.html`}
                            render={ () => {
                                return (<Redirect to={`${publicURL}/staff`} />);
                            }
                        } 
                    /> 
                    <Route component={NotFound} />   
                </Switch>
              </StyledContainer>
            );
          }
        }
        
      </AzureAD>
    );
  }
}

export default App;
