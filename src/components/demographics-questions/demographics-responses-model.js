import signals from 'signals';


class DemographicsResponsesModel {
  constructor() {
    this.gender = null;
    this.age = 0;
    this.ethnicity = null;
    this.education = null;
    this.isWorking = null;
    this.isStudying = null;
    this.income = null;

    this.isGenderSet = false;
    this.isAgeSet = false;
    this.isEthnicitySet = false;
    this.isEducationSet = false;
    this.isStudyStateSet = false;
    this.isWorkStateSet = false;
    this.isIncomeOptionSet = false;

    // signals
    this.updated = new signals.Signal();
  }

  areAllValuesSet() {
    return this.isGenderSet
      && this.isAgeSet
      && this.isEthnicitySet
      && this.isEducationSet
      && this.isStudyStateSet
      && this.isWorkStateSet;
  }

  setAge(value) {
    this.age = value;
    this.isAgeSet = true;
    this.updated.dispatch();
  }

  getAgeState() {
    return this.isAgeSet;
  }

  setEducation(value) {
    this.education = value;
    this.isEducationSet = true;
    this.updated.dispatch();
  }

  getEducationState() {
    return this.isEducationSet;
  }
  
  setEthnicity(value) {
    this.ethnicity = value
    this.isEthnicitySet = true;
    this.updated.dispatch();
  }

  getEthnicityState() {
    return this.isEthnicitySet;
  }

  setGender(value) {
    this.gender = value;
    this.isGenderSet = true;
    this.updated.dispatch();
  }

  getGenderState() {
    return this.isGenderSet;
  }

  setIncome(value) {
    this.income = value;
    this.isIncomeOptionSet = true;
    this.updated.dispatch();
  }

  getIncomeState() {
    return this.isIncomeOptionSet;
  }

  setStudyState(value) {
    this.isStudying = value;
    this.isStudyStateSet = true;
    this.updated.dispatch();
  }

  getStudyState() {
    return this.isStudyStateSet;
  }

  setWorkState(value) {
    this.isWorking = value;
    this.isWorkStateSet = true;
    this.updated.dispatch();
  }

  getWorkState() {
    return this.isWorkStateSet;
  }
}


// create and export singleton
let demoResponsesModel = new DemographicsResponsesModel();
export default demoResponsesModel;
