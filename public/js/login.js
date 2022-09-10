/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const loginUsernameInput = document.querySelector('#login-username');
const loginPasswordInput = document.querySelector('#login-password');
const loginSubmitBtn = document.querySelector('#login-btn');

const loginFunctions = {
  login(user) {
    return fetchFunctions().postData('/login', user);
  },
  validateUser({
    username, password,
  }) {
    const schema = {
      username: { check: username.length > 3, message: 'username should have length at least 3 letters' },
      password: { check: /[a-zA-Z0-9_]{8,}$/.test(password), message: 'password should be at least 8 letters' },
    };

    const rules = Object.keys(schema);
    const errorMessages = {};
    for (let i = 0; i < rules.length; i += 1) {
      if (!schema[rules[i]].check) {
        errorMessages[rules[i]] = schema[rules[i]].message;
      }
    }
    if (Object.keys(errorMessages).length === 0) return true;
    return errorMessages;
  },
};

loginSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const user = {
    username: loginUsernameInput.value,
    password: loginPasswordInput.value,
  };

  const valid = loginFunctions.validateUser(user);
  if (valid === true) {
    loginFunctions.login(user)
      .then(() => { window.location.reload(); })
      .catch((err) => displayLoginErrors(JSON.parse(err).errors));
  } else {
    displayLoginErrors(valid);
  }
});

function displayLoginErrors(errors) {
  const userNameError = loginUsernameInput.parentElement.querySelector('.error');
  const passwordError = loginPasswordInput.parentElement.querySelector('.error');

  if (errors.username) {
    showError(loginUsernameInput, userNameError, errors.username);
  } else {
    hideError(loginUsernameInput, userNameError, 'valid');
  }

  if (errors.password) {
    showError(loginPasswordInput, passwordError, errors.password);
  } else {
    hideError(loginPasswordInput, passwordError, 'valid');
  }
}
