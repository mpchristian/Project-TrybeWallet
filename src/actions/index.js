export const actionUser = (email) => ({ type: 'SAVE_USER', email });

const END_POINT_CURRENCIES = 'https://economia.awesomeapi.com.br/json/all';

const recieveCurrencies = (currencies) => ({
  type: 'RECIEVE_CURRENCIES',
  currencies,
});

export const actionCurrencies = () => (
  (dispatch) => { // thunk declarado
    fetch(END_POINT_CURRENCIES)
      .then((response) => response.json())
      .then((currencies) => dispatch(recieveCurrencies(currencies)));
  }
);

export const actionAddExpense = (expenses) => ({ type: 'ADD_EXPENSE', expenses });
