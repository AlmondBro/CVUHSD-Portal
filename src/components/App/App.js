import React, { Component } from 'react';

//Import components
import PageContent from "../PageContent.js";

import isDev from 'isdev';

import {  Redirect } from 'react-router'
import { Route, Switch } from "react-router-dom";

//Import styledcomponents
import { StyledContainer } from "./App_StyledComponents.js";

//Import pages
import LogIn from '../LogIn.js';
import NotFound from '../NotFound.js';

import PrivateRoute from "../PrivateRoute.js";

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

  componentDidMount = () => {
    this.isAuthenticated();
  };

  render = () => {
    let publicURL = ""; //process.env.PUBLIC_URL;
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
                        return (<Redirect to={`${publicURL}/login`} />);
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
                          loggedIn={this.state.loggedIn}
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
                          component={ PageContent} 
                          // renderAsStudent={true}
            />

            <PrivateRoute path={`${publicURL}/student`}
                          loggedIn={this.state.loggedIn}
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

export default App;
