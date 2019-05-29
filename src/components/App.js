import React, { Component } from 'react';

//Import components
import Header from "./Header.js";
import PageContent from "./PageContent.js";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header key="header" />
        <PageContent key="pageContent"/>
      </div>
    );
  }
}

export default App;
