import _ from 'lodash';

// models
import questionsModel from '../../models/questions-model';
import settingsModel from '../../models/settings-model';


class LifeOrientationTestModel {
  constructor() {
    this.formState = 'not submitted';
  }

  getText() {
    return _.get(questionsModel, 'lifeOrientation.intro.' + settingsModel.lang);
  }

  getResponses() {
    return [];
  }
}


// create and export singleton
let lotModel = new LifeOrientationTestModel();
export default lotModel;
