const fetchFunctions = {
  fetchUrl(method, url, body) {
    const config = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (body) {
      config.body = JSON.stringify(body);
    }
    return fetch(url, config)
      .then((data) => data.json());
  },

  getData(url) {
    return this.fetchUrl('GET', url)
      .then((res) => {
        if (res.status === 404) alert(res.message);
        else if (res.status === 500) window.location.href = '../html/500.html';
        else if (res.message !== 'No data found') {
          return res.result;
        }
        return null;
      });
  },

  postData(url, body) {
    return this.fetchUrl('POST', url, body)
      .then((res) => {
        if (res.status === 404) alert(res.message);
        else if (res.status === 500) window.location.href = '../html/500.html';
        else if (res.status === 400) throw JSON.stringify(new CustomError(res.message, res.errors));
        else if (res.message === 'No data found') {
          return null;
        } else {
          return res.result;
        }
        return null;
      });
  },
};
