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
      passwordHidden: true,
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
      state: { email, password, passwordHidden },
      props: { saveUserData, history },
    } = this;
    return (
      <div className="login-page">
        <div className="login-form">
          <div className="trybewallet-title">
            <h1>
              TrybeWallet
              <span id="emoji" role="img" aria-label="Money flying">💸</span>
            </h1>
          </div>
          <form className="login-inputs">
            <label htmlFor="email-input" className="email-field">
              Email
              <input
                data-testid="email-input"
                id="email-input"
                className="email-input"
                type="email"
                name="email"
                onChange={ handleState }
                placeholder="email@email.com"
                value={ email }
                required
              />
            </label>

            <label htmlFor="password-input">
              Senha
              {' '}
              {passwordHidden ? (
                <span
                  role="button"
                  onClick={ () => this.setState({ passwordHidden: false }) }
                  onKeyDown={ () => { } }
                  tabIndex={ 0 }
                >
                  <span
                    className="monkey-emojis"
                    role="img"
                    aria-label="Monkey with closed eyes"
                  >
                    🙈
                  </span>
                </span>

              ) : (
                <span
                  role="button"
                  onClick={ () => this.setState({ passwordHidden: true }) }
                  onKeyDown={ () => { } }
                  tabIndex={ 0 }
                >
                  <span
                    className="monkey-emojis"
                    role="img"
                    aria-label="Monkey with closed eyes"
                  >
                    🐵
                  </span>
                </span>

              )}
              <input
                data-testid="password-input"
                id="password-input"
                className="password-input"
                name="password"
                onChange={ handleState }
                type={ passwordHidden ? 'password' : 'text' }
                value={ password }
                required
              />
            </label>

            <div className="submit-field">
              <button
                type="submit"
                id="submit-login-btn"
                disabled={ enableButton(email, password) }
                onClick={ (event) => {
                  event.preventDefault();
                  saveUserData(email);
                  history.push('/carteira');
                } }
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
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
