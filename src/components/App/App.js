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

import SimpleStorage, { resetParentState } from "react-simple-storage";


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
     loggedIn: null,
      accountInfo: null,
      organizationalUnit: null,
     //TODO: Eliminate redudant fullName and first/lastName from state
      userInfo: {
          firstName: "",
          lastName: "",
          title: "",
          site: "",
          email: "",
          isStudent: null
      },

      firstName: "",
      lastName: "",
      fullName: "",
      title: "",
      site: "",

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
    //clearStorage("PortalStorage");
    resetParentState(this, this.initialState);
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
    const headers = new Headers({ 
            Authorization: `Bearer ${token.accessToken}`,  
            'Content-Type': 'application/json'
        }
    );
    
    const options = {
      method: "GET",
      headers: headers
    };

    let graphInfo = await fetch(`https://graph.microsoft.com/v1.0/me`, options)
      .then(response =>  response.json() )
      .then(response => {
        console.log("response:\t" + JSON.stringify(response));
        this.setState({graphInfo: JSON.stringify(response)});
        } )
      .catch(response => {
        this.setState({graphInfo: response.text()});
        throw new Error(response.text());
      });

     
      const getOU_URL = `${isDev ? "" : "/server" }/getOU`; 

      const getOU_headers = {
          'Content-Type': 'application/json',
          'credentials': 'include',
          'Access-Control-Allow-Origin': '*',
      };
  
      let OU = await fetch(getOU_URL, {
          method: 'POST',
          headers: getOU_headers,
          body: JSON.stringify({user: "d.medinaacosta163@centinela.k12.ca.us"})
      }).then((response) => {
          //Return just the reponse
          return response.json();
      }).then((OU) => {
        //Parse the JSON of the response
        console.log("capybara 2:\t" + (OU) );
        this.setState({organizationalUnit:  OU})
      }).catch((error) => {
          console.error(`Catching error:\t ${error}`);
      });

      let userObject = await { graphInfo, OU } ;

      return userObject; 
      //setTimeout(() => { graphInfo, OU}, 2000);

  }; //end getUserInfo()

  componentDidMount = () => {
   // this.isAuthenticated();
    let graphInfo = this.getUserInfo();

    console.log("Graph info:\t" + JSON.stringify(graphInfo) );
  };

  render = () => {
    let publicURL = ""; //process.env.PUBLIC_URL;
    return (
      <AzureAD provider={authProvider} forceLogin={true}>
        {
          ({login, logout, accountInfo, authenticationState, error }) => {
            console.log("Account info:\t" + JSON.stringify(accountInfo));

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
                                                      fullName={this.state.fullName}
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
                                  fullName={this.state.fullName}
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
                                  fullName={this.state.fullName}
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
