import _ from 'lodash';
import signals from 'signals';


// services
import DatabaseService from '../../services/database-service';

// models
import settingsModel from '../../models/settings-model';


class AdminAppModel {
  constructor() {
    this.data = null;
    this.startTimes = null;
    this.numDataFetched = 0;

    // signals
    this.updated = new signals.Signal();
  }

  fetchData() {
    this.numDataFetched = 0;

    DatabaseService.downloadAllData(settingsModel.baseURL)
      .then((response) => {
        this.data = JSON.parse(response).responses;
        this.numDataFetched++;
        this.updated.dispatch();
      })
      .catch(() => {
        console.warn(
          'Warning at adminModel#fetchData: '
          + 'unable to obtain responses data.'
        );
        this.updated.dispatch();
      });

    DatabaseService.downloadStartTimesData(settingsModel.baseURL)
      .then((response) => {
        this.startTimes = JSON.parse(response);
        this.numDataFetched++;
        this.updated.dispatch();
      })
      .catch(() => {
        console.warn(
          'Warning at adminModel#fetchData: '
          + 'unable to obtain questionnaires started data.'
        );
        this.updated.dispatch();
      });
  }

  getDropRate() {
    let numDropped = this.startTimes.length - this.data.length;

    return ((numDropped / this.startTimes.length) * 100)
      .toFixed(1)
      .toString() + '%';
  }

  getGenderPercentage(gender) {
    let array = _.filter(
      this.data,
      {
        data: {
          demographics: {
            gender: gender
          }
        }
      }
    );
    return ((array.length / this.data.length) * 100)
      .toFixed(1)
      .toString() + '%';
  }

  getLangPercentage(lang) {
    let array = _.filter(
      this.data,
      {lang: lang}
    );
    return ((array.length / this.data.length) * 100)
      .toFixed(1)
      .toString() + '%';
  }

  getN() {
    return this.data.length;
  }

  hasData() {
    return this.numDataFetched >= 2;
  }
}


// create and export singleton
let adminModel = new AdminAppModel();
export default adminModel;