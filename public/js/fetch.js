const fetchFunctions = {
  fetchUrl (method, url, body) {
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

  fetchData(url, successCb) {
    this.fetchUrl('GET', url)
      .then((res) => {
        if (res.status === 404) alert(res.message);
        else if (res.status === 500) window.location.href = '../html/500.html';
        else if (res.message === 'No data found') {
          successCb();
        } else {
          successCb(res.result);
        }
      });
  },
};
