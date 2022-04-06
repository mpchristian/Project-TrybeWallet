import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, allValues } = this.props;
    const total = allValues.reduce((acc, curr) => acc + curr, 0);
    return (
      <header className="header-container">
        <div>
          <span id="emoji-header" role="img" aria-label="Money flying">💸</span>
        </div>
        <div className="header-right">
          <div>
            <p data-testid="email-field">{ email }</p>
          </div>
          <div className="total-field">
            <div>
              Total:
              {' '}
              <span data-testid="total-field">
                { total.toFixed(2) }
              </span>
              <span data-testid="header-currency-field">
                {' '}
                BRL
              </span>
            </div>
          </div>
        </div>
      </header>
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
