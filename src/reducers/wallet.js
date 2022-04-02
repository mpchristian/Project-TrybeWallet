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
      expenses: [...state.expenses, action.expenses],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
