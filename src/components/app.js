import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './header';
import {loadCsv} from '../actions/app-actions';

import '../stylesheets/main.scss';

class App extends Component {

  componentWillMount() {
    // Preload taxi data
    this.props.loadCsv('data/taxi.csv');
  }

  render() {
    const {children} = this.props;

    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
}

export default connect((state) => state.app, {loadCsv})(App);
