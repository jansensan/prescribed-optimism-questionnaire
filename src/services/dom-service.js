// public api
let DOMService = {
  setFocus: setFocus,
  scrollToTop: scrollToTop,
};
export default DOMService;


// public methods definitions
function scrollToTop() {
  return new Promise((resolve) => {
    window.scrollTo(0, 0);
    resolve();
  });
}

function setFocus(target) {
  // TODO: find the current page's h1
  // rather than expecting DOM element
  return new Promise((resolve) => {
    document.activeElement.blur()
    target.focus();
    resolve();
  });
}
