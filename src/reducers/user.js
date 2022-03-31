// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_USER_STATE = {};

const user = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case 'SAVE_USER':
    return { email: action.email };
  default:
    return state;
  }
};

export default user;
