HTMLElement.prototype.createAppend = function (nodeType, nodeProps) {
  const node = document.createElement(nodeType);
  const propKeys = Object.keys(nodeProps);
  for (let i = 0; i < propKeys.length; i += 1) {
    if ([propKeys[i]] in node) {
      node[propKeys[i]] = nodeProps[propKeys[i]];
    }
  }
  this.appendChild(node);
  return node;
};

function formatDate(date) {
  return `${new Date(date).toLocaleDateString()} - ${new Date(date).toLocaleTimeString()}`;
}

function validateUrl(url) {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return regex.test(url);
}

function validateImageUrl(url) {
  console.log(url);
  return (url.match(/\.(jpeg|jpg|gif|png)$/gi) != null);
}

function validatePassword(password) {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return regex.test(password);
}

function validateEmail(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

const showError = (checkedInput, messageElement, errorMessage) => {
  messageElement.classList.remove('hidden');
  checkedInput.classList.add('invalid');
  messageElement.textContent = errorMessage;
};

const hideError = (checkedInput, messageElement, validMessage) => {
  messageElement.classList.add('hidden');
  checkedInput.classList.remove('invalid');
  messageElement.textContent = validMessage;
};
