import React, { Component } from 'react';

// models
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
    surveyModel.updated.add(this.onModelUpdated, this);
    questionsModel.updated.add(this.onQuestionsModelUpdated, this);
  }

  // react methods definitions
  render() {
    return (
      <div className="survey">
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
  onDownloadRequested() {
    window.open(
      'data:text/json;charset=utf-8,' +
      responsesModel.getResponsesJSON()
    );
  }

  onModelUpdated() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }

  onNextQuestionRequested() {
    var formElement = document.getElementById('surveyForm');
    surveyModel.validateForm(formElement);

    if (formElement.checkValidity()) {
      surveyModel.saveResponses();
      surveyModel.setFormAsValid(formElement);
      surveyModel.gotoNextQuestion();
    }

    window.scrollTo(0, 0);
  }

  onQuestionsModelUpdated() {
    if (questionsModel.isReady()) {
      surveyModel.setRandomVignette();
      surveyModel.setInitQuestion();
    }
  }
}