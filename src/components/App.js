import React, { Component } from 'react';

//Import components
import PageContent from "./PageContent.js";

//Import 3rd-party APIs
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

import {  Redirect } from 'react-router'
import { Route, Switch } from "react-router-dom";

//Import pages
import LogIn from './LogIn.js';
import NotFound from './NotFound.js';

//TODO: Have /staff.html redirect to /staff

//TODO: To make everything "color agnostic", add change blueSection to just 'sectionRow
//TODO: Make list for student portal


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
     /* containerStyle: {
        "background": `linear-gradient(to bottom, #4177a3 0%, #182c3d 100%)`
      } */
    }; //end state object
    console.log("Props:\t" + JSON.stringify(this.props) );
  } //end constructor

  Container = ({className, children, fluid}) => (
    <Container className={className} fluid={fluid}>
      { children }
    </Container>
  );
  
  StyledContainer = styled(Container)`
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#4177a3+0,182c3d+100 */
      background: #4177a3; /* Old browsers */
      background: -moz-linear-gradient(top,  #4177a3 0%, #182c3d 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top,  #4177a3 0%,#182c3d 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom,  #4177a3 0%,#182c3d 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4177a3', endColorstr='#182c3d',GradientType=0 ); /* IE6-9 */

      height: 100%;
  `;

  /*
  changeContainerStyle = (styleObject) => {
    this.setState({containerStyle: styleObject});
  }; //end changeContainerStyle() function
  */

  render = () =>{
    return (
      <this.StyledContainer fluid={true}>
        <Switch>
          
            <Route exact path="/" 
                    render={ () => {
                        return (<Redirect to="/login" />);
                    }
                } 
            />
            <Route path="/login" render={ () => <LogIn changeContainerStyle={this.changeContainerStyle} /> } />
            <Route path="/page-content" render={ () => { return <PageContent key="pageContent"/>} } />
            <Route component={NotFound} />
          
        </Switch>
      </this.StyledContainer>
    );
  }
}

export default App;
