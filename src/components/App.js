import React, { Component } from 'react';

//Import components
import PageContent from "./PageContent.js";

//Import 3rd-party APIs
import styled from 'styled-components';

import {  Redirect } from 'react-router'
import { Route, Switch } from "react-router-dom";

//Import pages
import LogIn from './LogIn.js';
import NotFound from './NotFound.js';

//TODO: Have /staff.html redirect to /staff

//TODO: To make everything "color agnostic", add change blueSection to just 'sectionRow
//TODO: Make list for student portal
let ContainerFluid = styled.div`
  padding-left: 0;
  padding-right: 0;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn : true
    };
  }

  render() {
    return (
      <ContainerFluid>
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
      </ContainerFluid>
    );
  }
}

export default App;
