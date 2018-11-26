import _ from 'lodash';
import signals from 'signals';

// constants
import { FormStates } from '../../constants/form-states';

// models
import questionsModel from '../../models/questions-model';
import settingsModel from '../../models/settings-model';
import responsesModel from '../../models/responses-model';


class LifeOrientationTestModel {
  constructor() {
    this.formState = FormStates.NOT_SUBMITTED;
    this.responseModels = [];
    responsesModel.initLOTResponses();

    // signals
    this.updated = new signals.Signal();
  }

  addResponseModel(model) {
    this.responseModels.push(model);
  }

  getText() {
    return _.get(questionsModel, 'lifeOrientation.intro.' + settingsModel.lang);
  }

  getTitle() {
    return _.get(questionsModel, 'lifeOrientation.title.' + settingsModel.lang);
  }

  getQuestions() {
    let questions = [];
    let lot = _.get(questionsModel, 'lifeOrientation');
    if (lot && lot.hasOwnProperty('questions')) {
      questions = lot.questions;
    }
    return questions;
  }
  
  isFormInvalid() {
    return this.formState === FormStates.INVALID;
  }

  saveResponses() {
    let responseValues = []
    this.responseModels.forEach(model => {
      responseValues.push(model.value);
    });
    responsesModel.saveLOTResponses(responseValues);
  }

  setFormAsValid(formElement) {
    this.formState = FormStates.VALID;
    for (let i = 0; i < formElement.length; i++) {
      let input = formElement[i];
      input.setCustomValidity('');
    }
    this.updated.dispatch();
  }

  validateForm(formElement) {
    this.formState = FormStates.VALID;

    for (let i = 0; i < this.responseModels.length; i++) {
      let model = this.responseModels[i];
      if (!model.hasChanged) {
        // set form state
        this.formState = FormStates.INVALID;
        // set input as invalid
        let input = _.find(formElement, {name: model.name});
        input.setCustomValidity('Required');
      }
    }

    this.updated.dispatch();
  }
}


// create and export singleton
let lotModel = new LifeOrientationTestModel();
export default lotModel;
