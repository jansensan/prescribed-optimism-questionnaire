// public api
let SettingsService = {
  // properties
  isFetching: false,
  // methods
  fetch: fetch
};
export default SettingsService;

// public methods definitions
function fetch() {
  SettingsService.isFetching = true;

  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.onload = onRequestCompleted;
    request.onerror = onRequestFailed;
    request.open('GET', 'settings.json', true);
    request.send();

    function onRequestCompleted() {
      let json = JSON.parse(this.responseText);
      resolve(json);
    }

    function onRequestFailed(error) {
      reject(error);
    }
  });
}
