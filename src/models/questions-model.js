import signals from 'signals';


class QuestionsModel {
  constructor() {
    // properties
    this.demographics = [];
    this.vignettes = [];
    this.lifeOrientation = [];

    // signals
    this.updated = new signals.Signal();
  }

  isReady() {
    // TODO: consider demographics and lifeOrientation
    return this.vignettes.length > 0;
  }

  setDemographics(value) {
    this.demographics = value;
    this.updated.dispatch();
  }

  setVignettes(value) {
    this.vignettes = value;
    this.updated.dispatch();
  }

  setLifeOrientation(value) {
    this.lifeOrientation = value;
    this.updated.dispatch();
  }
}


// create and export singleton
let questionsModel = new QuestionsModel();
export default questionsModel;