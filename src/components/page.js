import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';

import MarkdownPage from './markdown-page';
import {loadContent} from '../actions/app-actions';
import * as Demos from './demos';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: this._loadContent(props.route.content)
    };
  }

  componentWillReceiveProps(nextProps) {
    const {route} = nextProps;
    if (this.props.route !== route) {
      this.setState({
        content: this._loadContent(route.content)
      });
    }
  }

  _loadContent(content) {
    if (typeof content === 'string') {
      this.props.loadContent(content);
    }
    return content;
  }

  @autobind _renderDemo(name, isInline) {
    const DemoComponent = Demos[name];

    return (
      <div className={isInline ? "inline-code" : "demo"}>
        <DemoComponent />
      </div>
    );
  }

  // replaces the current query string in react-router
  @autobind _updateQueryString(queryString) {
    const {location: {pathname, search}} = this.props;
    if (search !== queryString) {
      this.context.router.replace({
        pathname,
        search: queryString
      });
    }
  }

  render() {
    const {contents, location: {query}} = this.props;
    const {content} = this.state;

    let child;

    if (content.demo) {
      child = this._renderDemo(content.demo, content.code);
    } else if (typeof content === 'string') {
      child = (<MarkdownPage content={contents[content]}
        query={query}
        updateQueryString={this._updateQueryString}
        renderDemo={this._renderDemo} />);
    }

    return <div className="page">{child}</div>;
  }
}

Page.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    contents: state.contents
  };
}

export default connect(mapStateToProps, {loadContent})(Page);
