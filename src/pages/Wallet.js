import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (<Header email={ email } />);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string,
};

Wallet.defaultProps = {
  email: '',
};

export default connect(mapStateToProps)(Wallet);
