import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleState = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  emailIsValid = (emailAdress) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    // regex from https://regexr.com/3e48o
    return emailRegex.test(emailAdress);
  }

  passwordIsValid = (password) => {
    const masLengthPassword = 6;
    return password.length >= masLengthPassword;
  }

  enableButton = (email, password) => {
    const result = this.emailIsValid(email) && this.passwordIsValid(password);
    return !result;
  }

  render() {
    const {
      handleState,
      enableButton,
      state: { email, password },
      props: { saveUserData, history },
    } = this;
    return (
      <>
        <div>Bem-vindo ao TrybeWallet</div>
        <div>
          <form>
            <label htmlFor="email-input">
              Email:
              {' '}
              <input
                data-testid="email-input"
                id="email-input"
                type="email"
                name="email"
                onChange={ handleState }
                placeholder="email@email.com"
                value={ email }
                required
              />
            </label>

            <label htmlFor="password-input">
              Senha:
              {' '}
              <input
                data-testid="password-input"
                id="password-input"
                name="password"
                onChange={ handleState }
                placeholder="••••••"
                type="password"
                value={ password }
                required
              />
            </label>

            <button
              type="submit"
              disabled={ enableButton(email, password) }
              onClick={ (event) => {
                event.preventDefault();
                saveUserData(email);
                history.push('/carteira');
              } }
            >
              Entrar
            </button>
          </form>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (value) => dispatch(actionUser(value)),
});

Login.propTypes = {
  saveUserData: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
