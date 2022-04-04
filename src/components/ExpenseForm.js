import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddExpense, actionEdit } from '../actions';

class ExpenseForm extends Component {
  render() {
    const {
      currencies, formState, handleForm, resetState, addExpense, editExpense,
    } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = formState;

    const noIdToEdit = -1;

    const { idToEdit, ...addToStore } = formState;

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
            onChange={ handleForm }
            min="0"
            step="0.01"
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            id="currency-input"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ handleForm }
          >
            {currencies.map((element) => (
              <option
                key={ element }
                value={ element }
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
            onChange={ handleForm }
          />
        </label>

        <label htmlFor="method-input">
          Método de pagamento:
          {' '}
          <select
            id="method-input"
            data-testid="method-input"
            name="method"
            onChange={ handleForm }
            value={ method }
          >
            <option
              value="Dinheiro"
            >
              Dinheiro
            </option>

            <option
              value="Cartão de crédito"
            >
              Cartão de crédito
            </option>

            <option
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
            value={ tag }
            onChange={ handleForm }
          >
            <option
              value="Alimentação"
            >
              Alimentação
            </option>

            <option
              value="Lazer"
            >
              Lazer
            </option>

            <option
              value="Trabalho"
            >
              Trabalho
            </option>

            <option
              value="Transporte"
            >
              Transporte
            </option>
            <option
              value="Saúde"
            >
              Saúde
            </option>
          </select>
        </label>

        {
          idToEdit !== noIdToEdit ? (
            <button
              type="submit"
              onClick={ (event) => {
                event.preventDefault();
                // deleteExpense(idToEdit); // if new api request is needed
                // addExpense({ ...addToStore, id: idToEdit });
                editExpense({ ...addToStore, id: idToEdit });
                resetState({ id: idToEdit });
              } }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="submit"
              onClick={ (event) => {
                event.preventDefault();
                addExpense(addToStore);
                resetState({ id: addToStore.id + 1 });
              } }
            >
              Adicionar despesa
            </button>
          )
        }
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  formState: PropTypes.shape({
    idToEdit: PropTypes.number,
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  handleForm: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func,
};

ExpenseForm.defaultProps = {
  addExpense: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (value) => dispatch(actionAddExpense(value)),
  editExpense: (value) => dispatch(actionEdit(value)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
