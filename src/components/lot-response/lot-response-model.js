import signals from 'signals';
import lotModel from '../life-orientation-test/life-orientation-test-model';


export default class LOTResponseModel {
  constructor() {
    // properties
    this.data = {};
    this.value = -1;
    this.name = ''; // TODO: use this prop in template?
    this.hasData = false;
    this.hasChanged = false;

    // signals
    this.updated = new signals.Signal();
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

    // needed for validation
    // TODO: investigate if doubling from responsesModel
    lotModel.addResponseModel(this);

    this.updated.dispatch();
  }

  setInitialValue() {
    this.setValue(3);
  }

  setName() {
    this.name = 'lotQuestion' + this.data.index;
  }

  setValue(val) {
    this.value = parseInt(val, 10);
    this.updated.dispatch();
  }
}