import _ from 'lodash';
import signals from 'signals';

// models
import questionsModel from '../../models/questions-model';
import responsesModel from '../../models/responses-model';
import settingsModel from '../../models/settings-model';


class QuestionnaireModel {
  constructor() {
    this.currentVignette = -1;
    this.currentQuestion = -1;
    this.currentQuestionIndex = -1;
    this.questionIndexes = [];
    this.isInitQuestionSet = false;
    this.formState = 'not submitted';

    // signals
    this.updated = new signals.Signal();
  }

  createRandomizedIndexArray(length) {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(i);
    }
    return _.shuffle(arr);
  }

  getCurrentQuestionText() {
    let questionText = '';
    let vignetteQuestions = this.getCurrentQuestions();
    if (vignetteQuestions) {
      questionText = _.get(
        vignetteQuestions[this.currentQuestion],
        settingsModel.lang
      );
    }
    return questionText;
  }

  getCurrentQuestions() {
    return _.get(this.getCurrentVignette(), 'questions');
  }

  getCurrentResponses() {
    let responses = _.get(this.getCurrentVignette(), 'responses');
    if (!responses) {
      responses = [];
    }
    return responses;
  }

  getCurrentVignette() {
    return questionsModel.vignettes[this.currentVignette];
  }

  getCurrentVignetteId() {
    return _.get(this.getCurrentVignette(), 'id');
  }

  getQuestionNumber() {
    return this.currentQuestionIndex + 1;
  }

  gotoFirstQuestion() {
    this.currentQuestionIndex = 0;
    this.setCurrentQuestion();
  }
  
  gotoNextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.getCurrentQuestions().length) {
      this.currentQuestionIndex = this.getCurrentQuestions().length - 1;
    }
    this.setCurrentQuestion();
  }
  
  gotoPrevQuestion() {
    this.currentQuestionIndex--;
    if (this.currentQuestionIndex < 0) {
      this.currentQuestionIndex = 0;
    }
    this.setCurrentQuestion();
  }

  /**
  * Returns a random integer between min (inclusive) and max (inclusive)
  * Using Math.round() will give you a non-uniform distribution!
  */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setRandomVignette() {
    let numVignettes = questionsModel.vignettes.length;
    let randomIndex = this.getRandomInt(0, numVignettes - 1);
    this.setCurrentVignette(randomIndex);
  }

  setCurrentVignette(index) {
    this.currentVignette = index;
    this.updated.dispatch();
  }

  setInitQuestion() {
    if (this.isInitQuestionSet) {
      return;
    }

    let numQuestions = this.getCurrentQuestions().length;
    this.questionIndexes = this.createRandomizedIndexArray(numQuestions);

    responsesModel.initSurveyResponses(
      this.getCurrentVignette().id,
      this.questionIndexes
    );

    this.isInitQuestionSet = true;

    this.gotoFirstQuestion();
  }

  setCurrentQuestion() {
    this.currentQuestion = this.questionIndexes[this.currentQuestionIndex];
    this.updated.dispatch();
  }

  setFormAsValid(formElement) {
    this.formState = 'valid';
    for (let i = 0; i < formElement.length; i++) {
      let input = formElement[i];
      input.setCustomValidity('');
    }
    this.updated.dispatch();
  }

  validateForm(formElement) {
    let r = responsesModel.getSurveyResponsesForQuestion(this.currentQuestion);
    this.formState = 'valid';
    for (let i = 0; i < r.responses.length; i++) {
      let response = r.responses[i];
      if (!response.hasChanged) {
        // set form state
        this.formState = 'invalid';
        // set input as invalid
        let input = _.find(formElement, {name: response.name});
        input.setCustomValidity('Required');
      }
    }
    this.updated.dispatch();
  }
}


// create and export singleton
let questionnaireModel = new QuestionnaireModel();
export default questionnaireModel;
