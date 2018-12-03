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
              (adminModel.hasData) ?
              <ul>
                <li>n = {adminModel.getN()}</li>
                <li>
                  <span>Gender distribution:</span>
                    <ul>
                      <li>Female: {adminModel.getGenderPercentage('female')}</li>
                      <li>Male: {adminModel.getGenderPercentage('male')}</li>
                      <li>Other: {adminModel.getGenderPercentage('other')}</li>
                    </ul>
                </li>
                <li>
                  <span>Language in which questionnaire was filled:</span>
                  <ul>
                    <li>EN: {adminModel.getLangPercentage('en')}</li>
                    <li>ES: {adminModel.getLangPercentage('es')}</li>
                    <li>CA: {adminModel.getLangPercentage('ca')}</li>
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
              id="downloadButton"
              className="btn-primary btn-download"
              type="button"
              onClick={this.onDownloadRequested.bind(this)}
            >
              <span className="active-label">Download all data</span>
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
  onDownloadRequested() {
    // disable button while waiting for db
    var btn = document.getElementById('downloadButton');
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

        alert('Unable to download data, please contact admin for assistance.');
      });
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}
