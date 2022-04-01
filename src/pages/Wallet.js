import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { actionCurrencies } from '../actions';

class Wallet extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionCurrencies()); // enviando a action fetchCurrencies
  }

  render() {
    const { email } = this.props;
    return (<Header email={ email } />);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: () => dispatch(actionCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  dispatch: PropTypes.func,
};

Wallet.defaultProps = {
  email: '',
  dispatch: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
