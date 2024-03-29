// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_CURRENCIES_STATE = { currencies: [], expenses: [] };

const wallet = (state = INITIAL_CURRENCIES_STATE, action) => {
  switch (action.type) {
  case 'RECIEVE_CURRENCIES':
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((element) => element !== 'USDT'),
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses].sort((a, b) => a.id - b.id),
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.id),
    };
  case 'EDIT_EXPENSE': {
    const { exchangeRates } = state.expenses[action.editedExpense.id];
    const newExpense = { ...action.editedExpense, exchangeRates };

    return {
      ...state,
      expenses: [
        ...state.expenses.filter((element) => element.id !== action.editedExpense.id),
        newExpense,
      ].sort((a, b) => a.id - b.id),
    }; }
  default:
    return state;
  }
};

export default wallet;
