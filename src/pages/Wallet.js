import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { actionCurrencies } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import Table from '../components/Table';

const defaultState = {
  idToEdit: -1,
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionCurrencies()); // enviando a action
  }

  resetState = (newId) => {
    this.setState({ ...defaultState, ...newId });
  };

  loadState = (newstate) => {
    this.setState(newstate);
  }

  handleForm = ({ target }) => {
    const { name } = target;
    const value = (name === 'select' ? target.selected : target.value);
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, currencies, allValues } = this.props;
    const { idToEdit } = this.state;

    return (
      <>
        <Header email={ email } allValues={ allValues } />
        <ExpenseForm
          currencies={ currencies }
          formState={ this.state }
          handleForm={ this.handleForm }
          resetState={ this.resetState }
        />
        <Table
          loadState={ this.loadState }
          idToEdit={ idToEdit }
        />
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
