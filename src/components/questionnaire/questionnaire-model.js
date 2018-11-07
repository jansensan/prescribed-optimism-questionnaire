import _ from 'lodash';
import signals from 'signals';

import questionsModel from '../../models/questions-model';
import settingsModel from '../../models/settings-model';


class QuestionnaireModel {
  constructor() {
    this.currentSection = -1;
    this.currentQuestion = -1;

    // signals
    this.updated = new signals.Signal();
  }

  getCurrentQuestionText() {
    let questionText = '';
    let vignetteQuestions = _.get(questionsModel.vignettes[0], 'questions');
    if (vignetteQuestions) {
      questionText = _.get(vignetteQuestions[this.currentQuestion], settingsModel.lang);
    }
    return questionText;
  }

  getCurrentResponses() {
    let responses = _.get(questionsModel.vignettes[0], 'responses');
    if (!responses) {
      responses = [];
    }
    return responses;
  }
  
  getCurrentVignetteId() {
    return _.get(questionsModel.vignettes[0], 'id');
  }

  /**
  * Returns a random integer between min (inclusive) and max (inclusive)
  * Using Math.round() will give you a non-uniform distribution!
  */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setRandomSection() {
    let numVignettes = questionsModel.vignettes.length;
    let randomIndex = this.getRandomInt(0, numVignettes - 1);
    this.setCurrentSection(randomIndex);
  }

  setCurrentSection(index) {
    this.currentSection = index;
    this.updated.dispatch();
  }

  setCurrentQuestion(index) {
    this.currentQuestion = index;
    this.updated.dispatch();
  }
}


// create and export singleton
let questionnaireModel = new QuestionnaireModel();
export default questionnaireModel;
