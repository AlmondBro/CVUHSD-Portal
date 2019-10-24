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
      loggedIn : false,
      containerStyle : {
        "background-color": "red"
      }
    };
  }

  Container = ({className, children, fluid}) => (
    <Container className={className} fluid={fluid}>
      { children }
    </Container>
  );
  
  StyledContainer = styled(Container)`
    background-color: ${props => props.backgroundcolor };
  `;

  changeContainerStyle = (styleObject) => {
    this.setState({containerStyle: styleObject});
  }; //end changeContainerStyle() function
  

  render = () =>{
    return (
      <Container fluid={true} 
                 backgroundcolor={ this.state.containerStyle["background-color"] }
      >
        <Switch>
          
            <Route exact path="/" 
                    render={ () => {
                        return (<Redirect to="/login" />);
                    }
                } 
            />
            <Route path="/login" render={ props => <LogIn changeContainerStyle={this.updatePageTitle} /> } />
            <Route path="/page-content" render={ () => { return <PageContent key="pageContent"/>} } />
            <Route component={NotFound} />
          
        </Switch>
      </Container>
    );
  }
}

export default App;
