import React, { Component } from 'react';

// services
import DatabaseService from '../../services/database-service';
import settingsModel from '../../models/settings-model';

// styles
require('./admin-app.scss');


export default class AdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false,
    };
  }

  // react methods definitions
  render() {
    return (
      <div className="admin-app">
        <header>
          <div className="centered">
            <div className="title">Questionnaire Admin</div>
            <div className="description">Manage the questionnaire data</div>
          </div>
        </header>

        <div className="centered admin-content">
          <h1>Data</h1>
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
        </div>

        <footer>
          <div className="centered">
            <div className="title">Questionnaire Admin</div>
            <div className="description">Manage the questionnaire data</div>
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
      });
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}
