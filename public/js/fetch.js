function fetchFunctions() {
  const fetchUrl = (method, url, body) => {
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
  };

  const getData = (url) => fetchUrl('GET', url)
    .then((res) => {
      if (res.status === 404) window.location.href = '/error/404';
      else if (res.status === 500) window.location.href = '/error/500';
      else if (res.status === 400 || res.status === 403) {
        throw JSON.stringify(new CustomError(res.message, res.errors));
      } else if (res.message !== 'No data found') {
        changeUsername(res.user);
        return res.result || res;
      }
      return null;
    });

  const postData = (url, body) => fetchUrl('POST', url, body)
    .then((res) => {
      if (res.status === 404) window.location.href = '/error/404';
      else if (res.status === 500) window.location.href = '/error/500';
      else if (res.status === 400 || res.status === 403) {
        throw JSON.stringify(new CustomError(res.message, res.errors));
      } else if (res.message === 'No data found') {
        return null;
      } else {
        return res.result || res;
      }
      return null;
    });

  return {
    getData,
    postData,
  };
}
