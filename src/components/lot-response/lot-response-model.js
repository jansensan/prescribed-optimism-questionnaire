import signals from 'signals';

// models
import lotModel from '../life-orientation-test/life-orientation-test-model';
import questionsModel from '../../models/questions-model';
import settingsModel from '../../models/settings-model';


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
    let ratingResponses = _.get(
      questionsModel.lifeOrientation,
      'responses'
    );

    let response = '';
    if (ratingResponses && ratingResponses.length > 0) {
      response = ratingResponses[index];
    }

    return _.get(response, settingsModel.lang);
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