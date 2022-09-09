/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const signupUsernameInput = document.querySelector('#signup-username');
const signupEmailInput = document.querySelector('#signup-email');
const signupPasswordInput = document.querySelector('#signup-password');
const signupConfirmPasswordInput = document.querySelector('#signup-confirm-password');
const signupImageInput = document.querySelector('#signup-image-url');
const signupSubmitBtn = document.querySelector('#signup-btn');

const signupFunctions = {
  signup(user) {
    return fetchFunctions().postData('/signup', user);
  },
  validateUser({
    username, email, password, confirmPassword, avatarUrl,
  }) {
    const schema = {
      username: { check: username.length > 3, message: 'username should have length at least 3 letters' },
      email: { check: validateEmail(email), message: 'email is invalid' },
      password: { check: /[a-zA-Z0-9_]{8,}$/.test(password), message: 'password should be at least 8 letters' },
      confirmPassword: { check: password === confirmPassword, message: 'passwords doesn\'t match' },
      avatarUrl: { check: (validateUrl(avatarUrl) && validateImageUrl(avatarUrl)) || avatarUrl.trim() === '', message: 'image should be a valid url' },
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

function renderMessage(res) {
  console.log(res);
}

signupSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const user = {
    username: signupUsernameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
    confirmPassword: signupConfirmPasswordInput.value,
    avatarUrl: signupImageInput.value,
  };

  const valid = signupFunctions.validateUser(user);
  if (valid === true) {
    signupFunctions.signup(user)
      .then((res) => { renderMessage(res); })
      .catch((err) => displaySignupErrors(JSON.parse(err).errors));
  } else {
    displaySignupErrors(valid);
  }
});

function displaySignupErrors(errors) {
  const removeQuotes = (str) => str.replaceAll('"', '');
  const userNameError = signupUsernameInput.parentElement.querySelector('.error');
  const emailError = signupEmailInput.parentElement.querySelector('.error');
  const passwordError = signupPasswordInput.parentElement.querySelector('.error');
  const confirmPasswordError = signupConfirmPasswordInput.parentElement.querySelector('.error');
  const imageUrlError = signupImageInput.parentElement.querySelector('.error');

  if (errors.username) {
    showError(signupUsernameInput, userNameError, removeQuotes(errors.username));
  } else {
    hideError(signupUsernameInput, userNameError, 'valid');
  }

  if (errors.email) {
    showError(signupEmailInput, emailError, removeQuotes(errors.email));
  } else {
    hideError(signupEmailInput, emailError, 'valid');
  }

  if (errors.password) {
    showError(signupPasswordInput, passwordError, removeQuotes(errors.password));
  } else {
    hideError(signupPasswordInput, passwordError, 'valid');
  }

  if (errors.confirmPassword) {
    showError(
      signupConfirmPasswordInput,
      confirmPasswordError,
      removeQuotes(errors.confirmPassword),
    );
  } else {
    hideError(signupConfirmPasswordInput, confirmPasswordError, 'valid');
  }

  if (errors.avatarUrl) {
    showError(signupImageInput, imageUrlError, removeQuotes(errors.avatarUrl));
  } else {
    hideError(signupImageInput, imageUrlError, 'valid');
  }
}
