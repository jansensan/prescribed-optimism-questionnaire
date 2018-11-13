import signals from 'signals';

// constants
import { QuestionnaireSections } from '../constants/questionnaire-sections.js';


class QuestionnaireModel {
  constructor() {
    this.state = QuestionnaireSections.INTRO;

    // signals
    this.updated = new signals.Signal();
  }

  gotoDemographics() {
    this.setState(QuestionnaireSections.DEMOGRAPHICS);
  }

  gotoIntro() {
    this.setState(QuestionnaireSections.INTRO);
  }

  gotoLifeOrientationTest() {
    this.setState(QuestionnaireSections.LIFE_ORIENTATION_TEST);
  }

  gotoSurvey() {
    this.setState(QuestionnaireSections.SURVEY);
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
