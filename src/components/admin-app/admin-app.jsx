import React, { Component } from 'react';

// services
import DatabaseService from '../../services/database-service';

// models
import settingsModel from '../../models/settings-model';
import adminModel from './admin-app-model';

// styles
require('./admin-app.scss');


export default class AdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false,
    };

    // get db data
    adminModel.fetchData();

    // listen to updates
    adminModel.updated.add(this.update, this);
  }

  // react methods definitions
  render() {
    return (
      <div className="admin-app">
        <header>
          <div className="centered">
            <div className="title">Prescribed Optimism</div>
            <div className="description">Questionnaire Stats</div>
          </div>
        </header>

        <div className="centered admin-content">
          <section>
            <h1>Admin</h1>
            <p>Information about the progress of the <a href="https://github.com/jansensan/prescribed-optimism-questionnaire">experiment</a>.</p>
          </section>

          <section>
            <h2>Stats</h2>
            {
              (adminModel.hasData()) ?
              <ul>
                <li><b>n = {adminModel.getN()}</b></li>
                <li>Drop rate: <b>{adminModel.getDropRate()}</b></li>
                <li>
                  <span>Gender distribution:</span>
                    <ul>
                      <li>Female: <b>{adminModel.getGenderPercentage('female')}</b></li>
                      <li>Male: <b>{adminModel.getGenderPercentage('male')}</b></li>
                      <li>Other: <b>{adminModel.getGenderPercentage('other')}</b></li>
                    </ul>
                </li>
                <li>
                  <span>Language in which questionnaire was filled:</span>
                  <ul>
                    <li>EN: <b>{adminModel.getLangPercentage('en')}</b></li>
                    <li>ES: <b>{adminModel.getLangPercentage('es')}</b></li>
                    <li>CA: <b>{adminModel.getLangPercentage('ca')}</b></li>
                  </ul>
                </li>
              </ul>
              :
              <p>loading data...</p>
            }
          </section>

          <section>
            <h2>Download</h2>
            <p>Obtain the latest questionnaire data.</p>
            <button
              id="downloadDataButton"
              className="btn-primary btn-download"
              type="button"
              onClick={this.onResponseDataDownloadRequested.bind(this)}
            >
              <span className="active-label">Download responses data</span>
              <span className="disabled-label">⌛</span>
            </button>
            <button
              id="downloadStartTimesButton"
              className="btn-primary btn-download"
              type="button"
              onClick={this.onStartTimesDataDownloadRequested.bind(this)}
            >
              <span className="active-label">Download start times data</span>
              <span className="disabled-label">⌛</span>
            </button>
          </section>
        </div>

        <footer>
          <div className="centered">
            <div className="title">Prescribed Optimism</div>
            <div className="description">Questionnaire Stats</div>
          </div>
        </footer>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isComponentMounted: true
    });
  }


  // methods definitions
  onResponseDataDownloadRequested() {
    // disable button while waiting for db
    var btn = document.getElementById('downloadDataButton');
    btn.disabled = true;

    DatabaseService.downloadAllData(settingsModel.baseURL)
      .then((response) => {
        // ready for file download
        let filename = 'poq-data-' + new Date().getTime() + '.json';

        let temp = document.createElement('a');
        temp.setAttribute('href', 'data:text/json;charset=utf-8,' + response);
        temp.setAttribute('download', filename);

        temp.style.display = 'none';
        document.body.appendChild(temp);

        temp.click();

        document.body.removeChild(temp);

        // reenable btn
        btn.disabled = false;
      })
      .catch(() => {
        // reenable btn
        btn.disabled = false;

        alert('Unable to download responses data, please contact admin for assistance.');
      });
  }

  onStartTimesDataDownloadRequested() {
     // disable button while waiting for db
     var btn = document.getElementById('downloadStartTimesButton');
     btn.disabled = true;

     DatabaseService.downloadStartTimesData(settingsModel.baseURL)
      .then((response) => {
        // ready for file download
        let filename = 'poq-start-times-' + new Date().getTime() + '.json';

        let temp = document.createElement('a');
        temp.setAttribute('href', 'data:text/json;charset=utf-8,' + response);
        temp.setAttribute('download', filename);

        temp.style.display = 'none';
        document.body.appendChild(temp);

        temp.click();

        document.body.removeChild(temp);

        // reenable btn
        btn.disabled = false;
      })
      .catch(() => {
        // reenable btn
        btn.disabled = false;

        alert('Unable to download start times data, please contact admin for assistance.');
      });
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}
