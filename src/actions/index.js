export const actionUser = (email) => ({ type: 'SAVE_USER', email });

const END_POINT_CURRENCIES = 'https://economia.awesomeapi.com.br/json/all';

const recieveCurrencies = (currencies) => ({
  type: 'RECIEVE_CURRENCIES',
  currencies,
});

const exchangeRates = (expenses, rates) => ({
  type: 'ADD_EXPENSE',
  expenses: {
    ...expenses,
    exchangeRates: rates,
  },
});

export const actionCurrencies = () => (
  (dispatch) => { // thunk declarado
    fetch(END_POINT_CURRENCIES)
      .then((response) => response.json())
      .then((currencies) => dispatch(recieveCurrencies(currencies)));
  }
);

export const actionAddExpense = (expenses) => (
  (dispatch) => { // thunk declarado
    fetch(END_POINT_CURRENCIES)
      .then((response) => response.json())
      .then((rates) => dispatch(exchangeRates(expenses, rates)));
  }
);
