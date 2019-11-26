import React, { Component } from 'react';

//Import components
import PageContent from "./PageContent.js";


import isDev from 'isdev';

//Import 3rd-party APIs
import styled from 'styled-components';
import css from 'styled-components';

import { Container } from 'react-bootstrap';

import {  Redirect } from 'react-router'
import { Route, Switch } from "react-router-dom";

//Import pages
import LogIn from './LogIn.js';
import NotFound from './NotFound.js';

import PrivateRoute from "./PrivateRoute.js";

//TODO: Have /staff.html redirect to /staff

//TODO: To make everything "color agnostic", add change blueSection to just 'sectionRow
//TODO: Make list for student portal

let ModifiedContainer = ({className, children, fluid}) => (
  <Container className={className} fluid={fluid}>
    { children }
  </Container>
);

let StyledContainer = styled(ModifiedContainer)`
  display: flex;
  flex-direction: column;
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#4177a3+0,182c3d+100 */
  /* background: #4177a3;  Old browsers */
  /*  background: -moz-linear-gradient(top,  #4177a3 0%, #182c3d 100%); FF3.6-15 */
  /* background: -webkit-linear-gradient(top,  #4177a3 0%,#182c3d 100%);  Chrome10-25,Safari5.1-6 */
  /* background: linear-gradient(to bottom,  #4177a3 0%,#182c3d 100%);  W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

  background-image: ${props => props.containerStyle["background-image"] || `url("./images/district-office-blueBG.jpg")` };
  background-repeat: ${props => props.containerStyle["background-repeat"] || `no-repeat` };
  background-size: ${props => props.containerStyle["background-size"] || `cover` };

  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4177a3', endColorstr='#182c3d',GradientType=0 ); /* IE6-9 */

  height: 100%;
  && { /*Overrode class style */
    padding-left: 0px;
    padding-right: 0px;
  }

  &&& {
    ${props => props.styledContainer && css`
      {props.styledContainer}
    `}
  }
 
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     loggedIn: null,

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
    title: "",
    site: "",

     isStudent: null,

     containerStyle: {
        "background": `linear-gradient(to bottom, #4177a3 0%, #182c3d 100%)`
      } 
    }; //end state object
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
        console.log("Jeff is cool!! And buff!!!");
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
        <Switch>
            { // Update routes to use server subdirectory in production
              //Source: https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1   
            }
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
                                              modifyLogInStatus={this.modifyLogInStatus} 
                                              modifyStudentStatus={this.modifyStudentStatus}
                                              modifyFullName={this.modifyFullName}
                                              modifyTitle={this.modifyTitle}
                                              modifySite={this.modifySite}
                                              changeContainerStyle={this.changeContainerStyle} 
                                        /> 
                          } 
            />
            <PrivateRoute path={`${publicURL}/page-content`}
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
            <Route component={NotFound} />   
        </Switch>
      </StyledContainer>
    );
  }
}

export default App;
