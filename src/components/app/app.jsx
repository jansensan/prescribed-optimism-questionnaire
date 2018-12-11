import React, { Component } from 'react';

// models
import questionnaireModel from '../../models/questionnaire-model';
import settingsModel from '../../models/settings-model';

// components
import Conclusion from '../conclusion/conclusion.jsx';
import DebugBanner from '../debug-banner/debug-banner.jsx';
import DemographicsQuestions from '../demographics-questions/demographics-questions.jsx';
import Intro from '../intro/intro.jsx';
import LifeOrientationTest from '../life-orientation-test/life-orientation-test.jsx';
import StudyCompletedBanner from '../study-completed-banner/study-completed-banner.jsx';
import Survey from '../survey/survey.jsx';
import TranslationSelection from '../translation-selection/translation-selection.jsx';

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
      if (
        !questionnaireModel.isStarted
        || questionnaireModel.isCompleted
        || settingsModel.isDebugMode()
        || settingsModel.isStudyCompleted()
      ) {
        return;
      }
      return 'You are about to quit the questionnaire. Are you sure you want to leave?';
    };
  }

  // react methods definitions
  render() {
    return (
      <div className="app">
        <StudyCompletedBanner />
        <DebugBanner />

        <header>
          <div className="centered">
            <div className="title">{this.state.title}</div>
            <div className="description">{this.state.description}</div>
          </div>
        </header>

        <div className="centered">
          <TranslationSelection />

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
