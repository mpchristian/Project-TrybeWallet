import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currency: 'USD',
      description: '',
      method: 'cash',
      cathegory: 'food',
    };
  }

  handleState = ({ target }) => {
    const { name } = target;
    const value = (name === 'select' ? target.selected : target.value);
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies } = this.props;
    const {
      value,
      currency,
      description,
      method,
      cathegory,
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
          <select data-testid="method-input" name="method" onChange={ this.handleState }>
            <option
              selected={ method === 'cash' }
              value="cash"
            >
              Dinheiro
            </option>

            <option
              selected={ method === 'credit' }
              value="credit"
            >
              Cartão de crédito
            </option>

            <option
              selected={ method === 'debit' }
              value="debit"
            >
              Cartão de débito
            </option>
          </select>
        </label>

        <label htmlFor="category-input">
          Categoria:
          {' '}
          <select data-testid="tag-input" name="cathegory" onChange={ this.handleState }>
            <option
              selected={ cathegory === 'food' }
              value="food"
            >
              Alimentação
            </option>

            <option
              selected={ cathegory === 'lazer' }
              value="lazer"
            >
              Lazer
            </option>

            <option
              selected={ cathegory === 'work' }
              value="work"
            >
              Trabalho
            </option>

            <option
              selected={ cathegory === 'transport' }
              value="transport"
            >
              Transporte
            </option>
            <option selected={ cathegory === 'health' } value="health">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ExpenseForm;
