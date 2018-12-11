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
    // get base url
    if (document.URL.indexOf('projects.jansensan.net') > 0) {
      // prod url
      this.baseURL = 'https://projects.jansensan.net/questionnaire/';
      
    } else {
      // local url
      let protocol = document.URL.split('//')[0];
      this.baseURL = protocol + '//' + document.domain + '/';
    }

    // parse url vars, if any
    let queryString = document.URL.split('?')[1];
    this.urlVars = {};
    if (queryString) {
      let temp = queryString.split('&');
      for (let i = 0; i < temp.length; i++) {
        let dict = temp[i].split('=');
        this.urlVars[dict[0]] = dict[1];
      }
    }

    // properties
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

  getButtonLabel(labelName) {
    return _.get(
      _.get(this.data, 'buttonsLabels'),
      labelName + '.' + this.lang
    );
  }

  getQuestionnaireTitle() {
    return _.get(this.data, 'title.' + this.lang);
  }

  getQuestionnaireDescription() {
    return _.get(this.data, 'description.' + this.lang);
  }

  isDebugMode() {
    let isDebug = _.get(this.data, 'debug');

    // url variables precede over settings
    if (this.urlVars.hasOwnProperty('debug')) {
      isDebug = _.get(this.urlVars, 'debug') === 'true';
    }

    return isDebug;
  }

  isLanguageEnglish() {
    return this.lang === Languages.EN;
  }
  
  isLanguageCastillan() {
    return this.lang === Languages.ES;
  }
  
  isLanguageCatalan() {
    return this.lang === Languages.CA;
  }

  isStudyCompleted() {
    return _.get(this.data, 'completed');;
  }

  setLanguage(newLanguage) {
    this.lang = newLanguage;
    this.updated.dispatch();
  }
}


// create and export singleton
let settingsModel = new SettingsModel();
export default settingsModel;
