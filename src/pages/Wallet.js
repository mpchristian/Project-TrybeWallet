import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { actionCurrencies } from '../actions';
import ExpenseForm from '../components/ExpenseForm';

class Wallet extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionCurrencies()); // enviando a action fetchCurrencies
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <>
        <Header email={ email } />
        <ExpenseForm currencies={ currencies } />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: () => dispatch(actionCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

Wallet.defaultProps = {
  email: '',
  dispatch: () => { },
  currencies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
