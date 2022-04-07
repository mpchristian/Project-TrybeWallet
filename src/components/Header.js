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
          <div className="header-right-elem" data-testid="email-field">
            { email }
          </div>
          <div className="total-field">
            <div className="header-right-elem">
              Total:
              <span className="header-right-elem" data-testid="total-field">
                { total.toFixed(2) }
              </span>
            </div>
            <div className="header-right-elem" data-testid="header-currency-field">
              BRL
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
