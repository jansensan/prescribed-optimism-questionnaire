import React, { Component } from 'react';

// constants
import { Languages } from '../../constants/languages';

// models
import settingsModel from '../../models/settings-model';

// components
import Survey from '../survey/survey.jsx';

// styles
require('./app.scss');


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'loading title...',
      description: 'loading description...'
    };

    settingsModel.updated.add(this.onSettingsUpdated, this);
    settingsModel.init();

    window.onbeforeunload = function () {
      return 'You are about to quit the questionnaire. Are you sure you want to leave?';
    };
  }

  // react methods definitions
  render() {
    return (
      <div className="app">
        <header>
          <div className="centered">
            <div className="title">{this.state.title}</div>
            <div className="description">{this.state.description}</div>
          </div>
        </header>

        <div className="centered">
          <fieldset className="lang-sel-fieldset">
            <button onClick={this.onEnglishSelected} className="btn-primary">EN</button>
            <button onClick={this.onSpanishSelected} className="btn-primary">ES</button>
            <button onClick={this.onCatalanSelected} className="btn-primary">CA</button>
          </fieldset>

          <Survey></Survey>
        </div>

        <footer>
          <div className="centered">
            <div className="title">{this.state.title}</div>
            <div className="description">{this.state.description}</div>
          </div>
        </footer>
      </div>
    );
  }

  // methods definitions
  onCatalanSelected() {
    settingsModel.setLanguage(Languages.CA);
  }
  
  onEnglishSelected() {
    settingsModel.setLanguage(Languages.EN);
  }
  
  onSpanishSelected() {
    settingsModel.setLanguage(Languages.ES);
  }

  onSettingsUpdated() {
    // assign values obtained to state
    this.state.title = settingsModel.getQuestionnaireTitle();
    this.state.description = settingsModel.getQuestionnaireDescription();

    // re-render
    this.forceUpdate();
  }
}
