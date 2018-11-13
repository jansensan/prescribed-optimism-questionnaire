import signals from 'signals';


export default class LOTResponseModel {
  constructor() {
    // properties
    this.data = {};
    this.value = -1;
    this.hasData = false;
    this.hasChanged = false;

    // signals
    this.updated = new signals.Signal();
  }

  getName() {
    // TODO
    return 'asdf';
  }

  getRatingResponseAt(index) {
    let ratingResponses = _.get(this.data, 'ratingResponses');
    let response = '';
    if (ratingResponses && ratingResponses.length > 0) {
      response = ratingResponses[index];
    }
    return response;
  }

  setAsChanged() {
    this.hasChanged = true;
  }

  setData(value) {
    this.data = value;
    this.hasData = true;

    this.updated.dispatch();
  }

  setInitialValue() {
    this.setValue(3);
  }

  setValue(val) {
    this.value = parseInt(val, 10);
    this.updated.dispatch();
  }
}