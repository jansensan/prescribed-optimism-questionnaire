import signals from 'signals';

// constants
import { QuestionnaireSections } from '../constants/questionnaire-sections.js';


class QuestionnaireModel {
  constructor() {
    this.state = QuestionnaireSections.INTRO;

    this.startTime = null;
    this.isCompleted = false;

    // signals
    this.updated = new signals.Signal();
  }

  gotoConclusion() {
    this.setState(QuestionnaireSections.CONCLUSION);
  }

  gotoDemographics() {
    this.setState(QuestionnaireSections.DEMOGRAPHICS);
  }

  gotoIntro() {
    this.setState(QuestionnaireSections.INTRO);
  }

  gotoLifeOrientationTest() {
    this.startTime = new Date();
    this.setState(QuestionnaireSections.LIFE_ORIENTATION_TEST);
  }

  gotoSurvey() {
    this.setState(QuestionnaireSections.SURVEY);
  }

  isConclusion() {
    return this.state === QuestionnaireSections.CONCLUSION;
  }

  isDemographics() {
    return this.state === QuestionnaireSections.DEMOGRAPHICS;
  }

  isIntro() {
    return this.state === QuestionnaireSections.INTRO;
  }

  isLifeOrientationTest() {
    return this.state === QuestionnaireSections.LIFE_ORIENTATION_TEST;
  }

  isSurvey() {
    return this.state === QuestionnaireSections.SURVEY;
  }

  setState(value) {
    if (value === this.state) {
      return;
    }

    this.state = value;
    this.updated.dispatch();
  }
}

// create and export singleton
let questionnaireModel = new QuestionnaireModel();
export default questionnaireModel;
