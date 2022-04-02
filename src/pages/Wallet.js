import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { actionCurrencies } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import Table from '../components/Table';

class Wallet extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionCurrencies()); // enviando a action
  }

  render() {
    const { email, currencies, allValues } = this.props;
    return (
      <>
        <Header email={ email } allValues={ allValues } />
        <ExpenseForm currencies={ currencies } />
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  allValues: state.wallet.expenses.map(
    ({ value, currency, exchangeRates }) => {
      const factor = exchangeRates[currency].ask;
      return factor * value;
    },
  ),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: () => dispatch(actionCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
  allValues: PropTypes.arrayOf(PropTypes.number),
};

Wallet.defaultProps = {
  email: '',
  dispatch: () => { },
  currencies: [],
  allValues: [0],
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
