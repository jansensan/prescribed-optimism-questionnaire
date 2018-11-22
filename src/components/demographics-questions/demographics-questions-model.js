import _ from 'lodash';
import signals from 'signals';

// constants
import { FormStates } from '../../constants/form-states';

// models
import demoResponsesModel from './demographics-responses-model';
import settingsModel from '../../models/settings-model';
import questionsModel from '../../models/questions-model';


class DemographicsQuestionsModel {
  constructor() {
    this.formState = FormStates.NOT_SUBMITTED;

    // signals
    this.updated = new signals.Signal();
  }

  getAgeQuestionLabel() {
    return _.get(
      this.getQuestionData('age'),
      'label.' + settingsModel.lang
    );
  }

  getEducationQuestionLabel() {
    return _.get(
      this.getQuestionData('education'),
      'label.' + settingsModel.lang
    );
  }

  getEducationRadioLabel(name) {
    // get first object from those with id value
    // same as name param
    let labels = _.filter(
      _.get(this.getQuestionData('education'), 'options'),
      {id: name}
    )[0];

    return _.get(labels, 'label.' + settingsModel.lang);
  }

  getEthnicityQuestionLabel() {
    return _.get(
      this.getQuestionData('ethnicity'),
      'label.' + settingsModel.lang
    );
  }

  getEthnicityRadioLabel(name) {
    // get first object from those with id value
    // same as name param
    let labels = _.filter(
      _.get(this.getQuestionData('ethnicity'), 'options'),
      {id: name}
    )[0];

    return _.get(labels, 'label.' + settingsModel.lang);
  }

  getGenderRadioLabel(name) {
    // get first object from those with id value
    // same as name param
    let labels = _.filter(
      _.get(this.getQuestionData('gender'), 'options'),
      {id: name}
    )[0];

    return _.get(labels, 'label.' + settingsModel.lang);
  }

  getGenderQuestionLabel() {
    return _.get(
      this.getQuestionData('gender'),
      'label.' + settingsModel.lang
    );
  }

  getIncomeQuestionLabel() {
    return _.get(
      this.getQuestionData('income'),
      'label.' + settingsModel.lang
    );
  }

  getIncomeOptions() {
    let rawOptions = _.get(
      this.getQuestionData('income'),
      'options'
    );
    
    let options = [];
    if (rawOptions) {
      rawOptions.forEach((option) => {
        options.push(_.get(option, settingsModel.lang));
      });
    }
    return options;
  }

  getQuestionData(questionId) {
    let data = {};
    if (questionsModel.demographics.length > 0) {
      // get first object from those with id
      data = _.filter(
        questionsModel.demographics, 
        {id: questionId}
      )[0];
    }
    return data;
  }

  getStudiesQuestionLabel() {
    return _.get(
      this.getQuestionData('studies'),
      'label.' + settingsModel.lang
    );
  }

  getWorkQuestionLabel() {
    return _.get(
      this.getQuestionData('work'),
      'label.' + settingsModel.lang
    );
  }

  setElementsValidity(elementName, isValid) {
    let elements = document.getElementsByName(elementName);
    let validityMessage = null;

    if (!isValid) {
      validityMessage = 'Required';
      this.formState = FormStates.INVALID;
    } else {
      validityMessage = '';
    }

    elements.forEach(element => {
      element.setCustomValidity(validityMessage);
    });

    this.updated.dispatch();
  }

  isFormInvalid() {
    return this.formState === FormStates.INVALID;
  }

  validateForm() {
    // gender
    this.setElementsValidity(
      'gender',
      demoResponsesModel.getGenderState()
    );

    // age
    this.setElementsValidity(
      'age',
      demoResponsesModel.getAgeState()
    );

    // ethnicity
    this.setElementsValidity(
      'ethnicity',
      demoResponsesModel.getEthnicityState()
    );

    // education
    this.setElementsValidity(
      'education',
      demoResponsesModel.getEducationState()
    );

    // isStudying
    this.setElementsValidity(
      'isStudying',
      demoResponsesModel.getStudyState()
    );

    // isWorking
    this.setElementsValidity(
      'isWorking',
      demoResponsesModel.getWorkState()
    );
  }
}


// create and export singleton
let demoQuestionsModel = new DemographicsQuestionsModel();
export default demoQuestionsModel;
