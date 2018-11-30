// public api
let DatabaseService = {
  // methods
  downloadAllData: downloadAllData,
  saveData: saveData,
  saveStartTime: saveStartTime,
};
export default DatabaseService;


// public methods definitions
function downloadAllData(baseURL) {
  let url = baseURL + 'services/download-data.php';

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.url = url;

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        warnAndReject(
          reject,
          'Error: issue while attempting to obtain data. ',
          xhr.statusText
        );
      }
    };
    xhr.onerror = () => {
      warnAndReject(
        reject,
        'Error: issue while attempting to obtain data. ',
        xhr.statusText
      );
    };
    xhr.ontimeout = () => {
      warnAndReject(
        reject,
        'Warning: timeout while attempting to obtain data. ',
        xhr.statusText
      );
    };

    xhr.send();
  });
}

function saveData(baseURL, startTime, lang, data, isDebugMode) {
  let url = baseURL + 'services/save-data.php';

  // create promise...
  let p;

  // ... depending on debug state
  if (!isDebugMode) {
    // make call to db
    p = new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.timeout = 5000;
      xhr.url = url;

      // send proper header info along with request
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      xhr.onload = () => {
        if (xhr.status === 200) {
          console.info('Data successfully saved.');
          resolve();
        } else {
          warnAndReject(
            reject,
            'Error: issue while attempting to save. ',
            xhr.statusText
          );
        }
      };
      xhr.onerror = () => {
        warnAndReject(
          reject,
          'Error: issue while attempting to save. ',
          xhr.statusText
        );
      };
      xhr.ontimeout = () => {
        warnAndReject(
          reject,
          'Warning: timeout while attempting to save. ',
          xhr.statusText
        );
      };

      let params = 'startTime=' + startTime
        + '&lang=' + lang
        + '&data=' + data;
      xhr.send(params);
    });

  } else {
    // do not save any data while debugging
    // (mock db)
    p = new Promise((resolve) => {
      console.warn('Debug mode: no actual data sent to db.');
      resolve();
    });
  }

  // return promise
  return p;
}

function saveStartTime(baseURL, value, isDebugMode) {
  let url = baseURL + 'services/save-start-time.php';

  // create promise...
  let p;

  // ... depending on debug state
  if (!isDebugMode) {
    // make call to db
    p = new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.timeout = 5000;
      xhr.url = url;

      // send proper header info along with request
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      xhr.onload = () => {
        if (xhr.status === 200) {
          console.info('Start time successfully saved.');
          resolve();
        } else {
          warnAndReject(
            reject,
            'Error: issue while attempting to save. ',
            xhr.statusText
          );
        }
      };
      xhr.onerror = () => {
        warnAndReject(
          reject,
          'Error: issue while attempting to save. ',
          xhr.statusText
        );
      };
      xhr.ontimeout = () => {
        warnAndReject(
          reject,
          'Warning: timeout while attempting to save. ',
          xhr.statusText
        );
      };

      let params = 'startTime=' + value;
      xhr.send(params);
    });

  } else {
    // do not save any data while debugging
    // (mock db)
    p = new Promise((resolve) => {
      console.warn('Debug mode: no actual data sent to db.');
      resolve();
    });
  }

  // return promise
  return p;
}


// private methods definitions
function warnAndReject(reject, message, statusText) {
  console.warn(message + statusText);
  reject(statusText);
}
