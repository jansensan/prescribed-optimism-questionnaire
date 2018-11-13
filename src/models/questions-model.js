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
    // TODO: add demographics
    return (
      this.vignettes.length > 0 &&
      this.lifeOrientation.length > 0
    );
  }

  setDemographics(value) {
    this.demographics = value;
    this.updated.dispatch();
  }

  setInitialValues(vignettes, demographics, lifeOrientation) {
    this.vignettes = vignettes;
    this.demographics = demographics;
    this.lifeOrientation = lifeOrientation;
    this.updated.dispatch();
    console.log(this.lifeOrientation.intro);
  }

  setLifeOrientation(value) {
    this.lifeOrientation = value;
    this.updated.dispatch();
  }

  setVignettes(value) {
    this.vignettes = value;
    this.updated.dispatch();
  }
}


// create and export singleton
let questionsModel = new QuestionsModel();
export default questionsModel;
