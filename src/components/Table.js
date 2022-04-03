import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDelete } from '../actions';

class Table extends Component {
  render() {
    const { expenses, deleteExpense, loadState } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {
            expenses.map(({
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
              id,
            }) => {
              const { name, ask } = exchangeRates[currency];
              const formatedValue = Number(value).toFixed(2);
              const formatedExchange = Number(ask).toFixed(2);
              const formatedConvertedValue = Number(value * ask).toFixed(2);
              return (
                <tbody key={ id }>
                  <tr>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{formatedValue}</td>
                    <td>{name.split('/')[0]}</td>
                    <td>{formatedExchange}</td>
                    <td>{formatedConvertedValue}</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => {
                          loadState({
                            idToEdit: id,
                            value,
                            currency,
                            description,
                            method,
                            tag,
                          });
                        } }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => deleteExpense(id) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })
          }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (value) => dispatch(actionDelete(value)),
});

Table.propTypes = {
  loadState: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.any),
  })).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
