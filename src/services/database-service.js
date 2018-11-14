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

    xhr.onload = () => {
      console.info(
        'Data successfully saved. '
        + xhr.responseText
      );
      resolve(xhr.responseText);
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
