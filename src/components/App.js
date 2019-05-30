import React, { Component } from 'react';

//Import components
import Header from "./Header.js";
import PageContent from "./PageContent.js";


//Import 3rd-party APIs
import styled from 'styled-components';

let ContainerFluid = styled.div`
  padding-left: 0;
  padding-right: 0;
`;

class App extends Component {
  render() {
    return (
      <ContainerFluid>
        <Header key="header" districtName="CVUHSD" headerTitle="Staff Portal" />
        <PageContent key="pageContent"/>
      </ContainerFluid>
    );
  }
}

export default App;
