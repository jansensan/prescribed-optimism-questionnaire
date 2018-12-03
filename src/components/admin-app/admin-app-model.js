import _ from 'lodash';
import signals from 'signals';


// services
import DatabaseService from '../../services/database-service';

// models
import settingsModel from '../../models/settings-model';


class AdminAppModel {
  constructor() {
    this.data = null;
    this.hasData = false;

    // signals
    this.updated = new signals.Signal();
  }

  fetchData() {
    DatabaseService.downloadAllData(settingsModel.baseURL)
      .then((response) => {
        this.data = JSON.parse(response).responses;
        this.hasData = true;
        this.updated.dispatch();
      })
      .catch(() => {
        console.warn(
          'Warning at adminModel#fetchData: '
          + 'unable to obtain data.'
        );
        this.updated.dispatch();
      });
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
}


// create and export singleton
let adminModel = new AdminAppModel();
export default adminModel;