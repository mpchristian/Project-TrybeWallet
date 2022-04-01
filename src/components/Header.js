import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, allValues } = this.props;
    const total = allValues.reduce((acc, curr) => acc + curr, 0);
    return (
      <div>
        <div>
          <h1>TrybeWallet</h1>
        </div>
        <div>
          <p data-testid="email-field">{ email }</p>
        </div>
        <div>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div>
          <p>
            Total:
            {' '}
            <span data-testid="total-field">{ total.toFixed(2) }</span>
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  allValues: PropTypes.arrayOf(PropTypes.number),
};

Header.defaultProps = {
  email: '',
  allValues: [0],
};

export default Header;
