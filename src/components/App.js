import React, { Component } from 'react';

//Import components
import Header from "./Header.js";
import PageContent from "./PageContent.js";


//Import 3rd-party APIs
import styled from 'styled-components';

import {  Redirect } from 'react-router'
import { BrowserRouter as Route, Switch } from "react-router-dom";
import LogIn from './LogIn.js';


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
        <Header key="header" districtName="CVUHSD" headerTitle="Portal" />
        <Switch>
          <Route exact path="/" 
                  render={ () => {
                       return (<Redirect to="/login" />);
                  }
              } 
          />
          <Route path="/login" component={LogIn} />
          <Route path="/pageContent" render={ () => { return <PageContent key="pageContent"/>} } />
        
        </Switch>
  
      </ContainerFluid>
    );
  }
}

export default App;
