import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddExpense } from '../actions';

const defaultTag = 'Alimentação';

const defaultState = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: defaultTag,
};

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = { id: 0, ...defaultState };
    // id is the counter. After the click it is incremented
  }

  handleState = ({ target }) => {
    const { name } = target;
    const value = (name === 'select' ? target.selected : target.value);
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies, addExpense } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            type="number"
            id="value-input"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleState }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select id="currency-input" name="currency" onChange={ this.handleState }>
            {currencies.map((element) => (
              <option
                key={ element }
                value={ element }
                selected={ element === currency }
              >
                {element}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="description-input">
          Descrição:
          {' '}
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleState }
          />
        </label>

        <label htmlFor="method-input">
          Método de pagamento:
          {' '}
          <select
            id="method-input"
            data-testid="method-input"
            name="method"
            onChange={ this.handleState }
          >
            <option
              selected={ method === 'Dinheiro' }
              value="Dinheiro"
            >
              Dinheiro
            </option>

            <option
              selected={ method === 'Cartão de crédito' }
              value="Cartão de crédito"
            >
              Cartão de crédito
            </option>

            <option
              selected={ method === 'Cartão de débito' }
              value="Cartão de débito"
            >
              Cartão de débito
            </option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          {' '}
          <select
            id="tag-input"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleState }
          >
            <option
              selected={ tag === defaultTag }
              value="Alimentação"
            >
              Alimentação
            </option>

            <option
              selected={ tag === 'Lazer' }
              value="Lazer"
            >
              Lazer
            </option>

            <option
              selected={ tag === 'Trabalho' }
              value="Trabalho"
            >
              Trabalho
            </option>

            <option
              selected={ tag === 'Transporte' }
              value="Transporte"
            >
              Transporte
            </option>
            <option
              selected={ tag === 'Saúde' }
              value="Saúde"
            >
              Saúde
            </option>
          </select>
        </label>

        <button
          type="submit"
          onClick={ (event) => {
            event.preventDefault();
            addExpense(this.state);
            this.setState({ ...defaultState, id: id + 1 });
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func,
};

ExpenseForm.defaultProps = {
  addExpense: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (value) => dispatch(actionAddExpense(value)),
});

export default connect(null, mapDispatchToProps)(ExpenseForm);
