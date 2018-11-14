import signals from 'signals';

// constants
import { FormStates } from '../../constants/form-states';

// models
import demoResponsesModel from './demographics-responses-model';


class DemographicsQuestionsModel {
  constructor() {
    this.formState = FormStates.NOT_SUBMITTED;

    // signals
    this.updated = new signals.Signal();
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

  isFormValid() {
    return this.formState === FormStates.VALID;
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
