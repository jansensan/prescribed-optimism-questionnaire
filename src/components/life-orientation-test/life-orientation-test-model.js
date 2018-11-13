import _ from 'lodash';

// models
import questionsModel from '../../models/questions-model';
import settingsModel from '../../models/settings-model';


class LifeOrientationTestModel {
  constructor() {
    this.formState = 'not submitted';
  }

  getText() {
    return _.get(questionsModel, 'lifeOrientation.intro.' + settingsModel.lang);
  }

  getQuestions() {
    let questions = [];
    let lot = _.get(questionsModel, 'lifeOrientation');
    if (lot && lot.hasOwnProperty('questions')) {
      questions = lot.questions;
    }
    return questions;
  }

  getResponses() {
    let responses = [];
    let lot = _.get(questionsModel, 'lifeOrientation');
    if (lot && lot.hasOwnProperty('responses')) {
      responses = lot.responses;
    }
    return responses;
  }
}


// create and export singleton
let lotModel = new LifeOrientationTestModel();
export default lotModel;
