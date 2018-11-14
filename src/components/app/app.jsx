import React, { Component } from 'react';

// constants
import { Languages } from '../../constants/languages';

// models
import questionnaireModel from '../../models/questionnaire-model';
import settingsModel from '../../models/settings-model';

// components
import Intro from '../intro/intro.jsx';
import LifeOrientationTest from '../life-orientation-test/life-orientation-test.jsx';
import Survey from '../survey/survey.jsx';
import DemographicsQuestions from '../demographics-questions/demographics-questions.jsx';
import Conclusion from '../conclusion/conclusion.jsx';

// styles
require('./app.scss');


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false,
      title: 'loading title...',
      description: 'loading description...'
    };

    // listen to updates
    settingsModel.updated.add(this.onSettingsUpdated, this);
    questionnaireModel.updated.add(this.update, this);
    
    // init settings
    settingsModel.init();
    
    // warn before quitting
    // TODO: add condition for if questionnaire is completed
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

          <Intro
            isVisible={questionnaireModel.isIntro()}
          ></Intro>
          <LifeOrientationTest
            isVisible={questionnaireModel.isLifeOrientationTest()}
          ></LifeOrientationTest>
          <Survey
            isVisible={questionnaireModel.isSurvey()}
            ></Survey>
          <DemographicsQuestions
            isVisible={questionnaireModel.isDemographics()}
          ></DemographicsQuestions>
          <Conclusion
            isVisible={questionnaireModel.isConclusion()}
          ></Conclusion>
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

  componentDidMount() {
    this.setState({
      isComponentMounted: true
    });
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

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}
