import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <div>
          <h1>TrybeWallet</h1>
        </div>
        <div>
          <p data-testid="email-field">{ email }</p>
        </div>
        <div>
          <p data-testid="total-field">0</p>
        </div>
        <div>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
};

Header.defaultProps = {
  email: '',
};

export default Header;
