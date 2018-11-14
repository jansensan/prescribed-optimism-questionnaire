import React, { Component } from 'react';

// models
import settingsModel from '../../models/settings-model';
import responsesModel from '../../models/responses-model';

// styles
require('./download-button.scss');

export default class DownloadButton extends Component {
  constructor(props) {
    super(props);
  }

  // react methods definitions
  render() {
    return (
      <div className={this.getComponentCSSClasses()}>
        <button
          className="btn-primary download-btn"
          onClick={this.onDownloadRequested.bind(this)}
        >Download</button>
      </div>
    );
  }

  // methods definitions
  getComponentCSSClasses() {
    let classes = ['download-button'];
    if (!settingsModel.isDebugMode()) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }

  onDownloadRequested() {
    window.open(
      'data:text/json;charset=utf-8,'
      + responsesModel.getResponsesJSON()
    );
  }
}
