import React, { Component } from 'react';

//Import components
import PageContent from "./PageContent.js";


//Import 3rd-party APIs
import styled from 'styled-components';

import {  Redirect } from 'react-router'
import { Route, Switch } from "react-router-dom";
import LogIn from './LogIn.js';


//TODO: Have /staff.html redirect to /staff

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
      <Switch>
        <ContainerFluid>
          
            <Route exact path="/" 
                    render={ () => {
                        return (<Redirect to="/login" />);
                    }
                } 
            />
            <Route path="/login" component={LogIn} />
            <Route path="/page-content" render={ () => { return <PageContent key="pageContent"/>} } />
            <Route render={ () => { return <p>404 Not Found</p>} } />
          
        </ContainerFluid>
      </Switch>
    );
  }
}

export default App;
