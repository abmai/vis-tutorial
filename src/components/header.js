import React, {Component} from 'react';

export default class Header extends Component {

  render() {
    return (
      <header>
        <div className="bg" />
        <div className="container">
          <a className="logo" href="#">Visualization Tutorial</a>
        </div>
      </header>
    );
  }
}
