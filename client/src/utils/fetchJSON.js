let needLogs = false;
// needLogs = process.env.NODE_ENV !== 'production';

const get = (url, onSuccess, onError) => {
  fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => {
      if (needLogs) console.log('---response fetchJSON get(1): ', response); //temp?

      if (!response.ok) {
        throw new Error(`Response is not ok, status: ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      if (needLogs) console.log('---response fetchJSON get(2): ', data); //temp?

      if (typeof onSuccess === 'function') onSuccess(data);
    })
    .catch(err => {
      if (needLogs) console.log('---error fetchNotes: ', err);

      if (typeof onError === 'function') onError(err);
    });
};

const post = (url, data, onSuccess, onError) => {
  let dataJSON;
  try {
    dataJSON = JSON.stringify(data);
  } catch (err) {
    return onError(err);
  }

  return fetch(url, {
    method: 'post',
    body: dataJSON,
    headers: {
      'Content-Type': 'application/json'
      // Accept: 'application/json'
    }
  })
    .then(response => {
      if (needLogs) console.log('---response fetchJSON post: ', response); //temp?

      if (!response.ok) {
        throw new Error(`Response is not ok, status: ${response.status}`);
      }

      if (typeof onSuccess === 'function') onSuccess(response);
    })
    .catch(err => {
      if (needLogs) console.log('---error fetchJSON post: ', err); //temp?

      if (typeof onError === 'function') onError(err);
    });
};

const deleteData = (url, onSuccess, onError) => {
  return fetch(url, {
    method: 'delete'
  })
    .then(response => {
      if (needLogs) console.log('---response fetchJSON delete: ', response); //temp?

      if (!response.ok) {
        throw new Error(`Response is not ok, status: ${response.status}`);
      }

      if (typeof onSuccess === 'function') onSuccess(response);
    })
    .catch(err => {
      if (needLogs) console.log('---error fetchJSON delete: ', err); //temp?

      if (typeof onError === 'function') onError(err);
    });
};

const fetchJSON = {
  get,
  post,
  delete: deleteData
};
export default fetchJSON;
