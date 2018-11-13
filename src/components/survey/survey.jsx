import React, { Component } from 'react';

// models
import questionnaireModel from '../../models/questionnaire-model';
import questionsModel from '../../models/questions-model';
import responsesModel from '../../models/responses-model';
import settingsModel from '../../models/settings-model';
import surveyModel from './survey-model';

// components
import Question from '../question/question.jsx';

// styles
require('./survey.scss');


export default class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false
    };

    // listen to updates
    questionnaireModel.updated.add(this.onQuestionnaireModelUpdated, this);
    questionsModel.updated.add(this.update, this);
    surveyModel.updated.add(this.update, this);
  }

  // react methods definitions
  render() {
    return (
      <div className={this.getComponentCSSClasses()}>
        <form id="surveyForm">
          <Question
            index={surveyModel.currentQuestion}
            text={surveyModel.getCurrentQuestionText()}
            responses={surveyModel.getCurrentResponses()}
          ></Question>
        </form>
        <div className="buttons-wrapper">
          <button
            className="btn-primary next-btn"
            onClick={this.onNextQuestionRequested.bind(this)}
          >Next</button>
          {
            (settingsModel.isDebugMode()) &&
            <button
              className="btn-primary download-btn"
              onClick={this.onDownloadRequested.bind(this)}
            >Download</button>
          }
        </div>
      </div>
    );
  }

  componentDidMount() { 
    this.setState({
      isComponentMounted: true
    });
    this.forceUpdate();
  }

  // methods definitions
  getComponentCSSClasses() {
    let classes = ['survey'];
    if (!this.props.isVisible) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }

  onDownloadRequested() {
    window.open(
      'data:text/json;charset=utf-8,' +
      responsesModel.getResponsesJSON()
    );
  }

  onNextQuestionRequested() {
    var formElement = document.getElementById('surveyForm');
    surveyModel.validateForm(formElement);

    if (formElement.checkValidity()) {
      surveyModel.saveResponses();
      surveyModel.setFormAsValid(formElement);
      
      if (!surveyModel.isLastQuestion()) {
        surveyModel.gotoNextQuestion();

      } else {
        questionnaireModel.gotoDemographics();
      }
    }

    window.scrollTo(0, 0);
  }

  onQuestionnaireModelUpdated() {
    if (questionnaireModel.isSurvey()) {
      // set initial content for survey
      surveyModel.setRandomVignette();
      surveyModel.setInitQuestion();

      // update component display
      this.update();
    }
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}