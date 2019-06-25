let needLogs = false;
needLogs = process.env.NODE_ENV !== 'production';

const thenParseJson = response => {
  if (needLogs) console.log('---response fetchJSON(1): ', response); //temp?

  return response.json();
};

const thenUseCallback = callback => data => {
  if (needLogs) console.log('---response fetchJSON(2): ', data); //temp?

  if (callback) callback(data);
};

const catchUseCallback = callback => err => {
  if (needLogs) console.log('---error fetchJSON: ', err);

  const localErrorData = {
    ok: false,
    message: 'Unexpected error'
  };

  callback(localErrorData);
};

const get = (url, parsedJsonCallback) => {
  fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(thenParseJson)
    .then(thenUseCallback(parsedJsonCallback))
    .catch(catchUseCallback(parsedJsonCallback));
};

const post = (url, data, parsedJsonCallback) => {
  fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(thenParseJson)
    .then(thenUseCallback(parsedJsonCallback))
    .catch(catchUseCallback(parsedJsonCallback));
};

const deleteData = (url, parsedJsonCallback) => {
  fetch(url, {
    method: 'delete',
    headers: {
      // 'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(thenParseJson)
    .then(thenUseCallback(parsedJsonCallback))
    .catch(catchUseCallback(parsedJsonCallback));
};

const fetchJSON = {
  get,
  post,
  delete: deleteData
};
export default fetchJSON;
