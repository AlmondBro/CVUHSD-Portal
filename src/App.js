import React, { Component } from 'react';

//Import components
import Header from "./Header.js";
import PageContent from "./PageContent.js";

class App extends Component {
  render() {
    return (
      <div class="container-fluid">
        <Header />
        <PageContent />
      </div>
    );
  }
}

export default App;
