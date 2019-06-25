const sendJsonExtending = express => {
  express.response.jsonOk = function(dataObject) {
    let objectToSend = { ok: true };

    if (typeof dataObject === 'object' && dataObject !== null) {
      objectToSend = { ...objectToSend, ...dataObject };
    }

    this.status(200).json(objectToSend);
  };

  express.response.jsonErr = function functionName(message, status) {
    let objectToSend = { ok: false };

    if (typeof message === 'string') {
      objectToSend = { ...objectToSend, message };
    }

    this.status(status || 400).json(objectToSend);
  };
};

module.exports = sendJsonExtending;
