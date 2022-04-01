// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_CURRENCIES_STATE = [];

const wallet = (state = INITIAL_CURRENCIES_STATE, action) => {
  switch (action.type) {
  case 'RECIEVE_CURRENCIES':
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((element) => element !== 'USDT'),
    };
  default:
    return state;
  }
};

export default wallet;
