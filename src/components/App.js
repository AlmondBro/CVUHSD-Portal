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
      loggedIn : true,
      containerStyle : {}
    };
  }

  Container = ({className, children}) => (
    <Container className={className}>
      { children }
    </Container>
  );
  
  StyledContainer = styled(Container)`
    background-color: ${this.state.containerStyle.backgroundColor}
  `;
  

  render() {
    return (
      <Container fluid={true}>
        <Switch>
          
            <Route exact path="/" 
                    render={ () => {
                        return (<Redirect to="/login" />);
                    }
                } 
            />
            <Route path="/login" component={LogIn} />
            <Route path="/page-content" render={ () => { return <PageContent key="pageContent"/>} } />
            <Route component={NotFound} />
          
        </Switch>
      </Container>
    );
  }
}

export default App;
