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
