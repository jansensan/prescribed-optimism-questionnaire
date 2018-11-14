import _ from 'lodash';
import signals from 'signals';

// constants
import { Languages } from '../constants/languages.js';

// services
import SettingsService from './../services/settings-service.js';

// models
import questionsModel from './questions-model.js';


class SettingsModel {
  constructor() {
    // properties
    this.baseURL = document.URL;
    this.data = [];
    this.lang = Languages.EN;
    this.hasFetched = false;

    // signals
    this.updated = new signals.Signal();
  }

  init() {
    SettingsService.fetch()
      .then(response => {
        this.data = _.get(response, 'app');
        questionsModel.setInitialValues(
          _.get(response, 'vignettes'),
          _.get(response, 'demographics'),
          _.get(response, 'lifeOrientation')
        );
        this.updated.dispatch();
      })
      .catch(error => {
        // FIXME: handle errors better
        console.error('unable to load data');
        console.table(error);
        this.updated.dispatch();
      });
  }

  areTranslationsReady() {
    return _.get(this.data, 'translationsReady');
  }

  getQuestionnaireTitle() {
    return _.get(this.data, 'title.' + this.lang);
  }

  getQuestionnaireDescription() {
    return _.get(this.data, 'description.' + this.lang);
  }

  isDebugMode() {
    return _.get(this.data, 'debug');
  }

  setLanguage(newLanguage) {
    this.lang = newLanguage;
    this.updated.dispatch();
  }
}


// create and export singleton
let settingsModel = new SettingsModel();
export default settingsModel;
