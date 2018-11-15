// public api
let DatabaseService = {
  // methods
  save: save
};
export default DatabaseService;


// public methods definitions
function save(baseURL, data) {
  let url = baseURL + 'services/save.php';

  return new Promise((resolve, reject) => {
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
        console.warn(
          'Error: issue while attempting to save. '
          + xhr.statusText
        );
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      console.warn(
        'Error: issue while attempting to save. '
        + xhr.statusText
      );
      reject(xhr.statusText);
    };
    xhr.ontimeout = () => {
      console.warn(
        'Warning: timeout while attempting to save. '
        + xhr.statusText
      );
      reject(xhr.statusText);
    };

    let params = 'data=' + data;
    xhr.send(params);
  });
}
