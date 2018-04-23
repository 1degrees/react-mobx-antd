import React, { Component } from 'react';
import Hander from './hander'
import Container from './container'
import Footer from './footer'

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <Hander/>
        <Container/>
        <Footer/>
      </div>
    );
  }
}