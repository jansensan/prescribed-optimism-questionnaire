import signals from 'signals';

// constants
import { QuestionnaireSections } from '../constants/questionnaire-sections.js';

// services
import DatabaseService from '../services/database-service.js';

// models
import settingsModel from './settings-model.js';


class QuestionnaireModel {
  constructor() {
    this.state = QuestionnaireSections.INTRO;

    this.startTime = null;
    this.isStarted = false;
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
    this.isStarted = true;
    this.startTime = new Date();
    DatabaseService.saveStartTime(
      settingsModel.baseURL,
      this.startTime.getTime(),
      settingsModel.isDebugMode()
    );
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
