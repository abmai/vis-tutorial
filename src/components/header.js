import React, {Component} from 'react';

export default class Header extends Component {

  render() {
    const {isMenuOpen, opacity, toggleMenu} = this.props;

    return (
      <header className={ isMenuOpen ? 'open' : '' }>
        <div className="bg" style={{opacity}} />
        <div className="container">
          <a className="logo" href="#">Visualization Tutorial</a>
          <div className="menu-toggle" onClick={ () => toggleMenu(!isMenuOpen) }>
            <i className={`icon icon-${isMenuOpen ? 'close' : 'menu'}`} />
          </div>
        </div>
      </header>
    );
  }
}
