import React, { Component } from 'react';

// models
import questionnaireModel from './questionnaire-model';
import questionsModel from '../../models/questions-model';
import responsesModel from '../../models/responses-model';
import settingsModel from '../../models/settings-model';

// components
import Question from '../question/question.jsx';

// styles
require('./questionnaire.scss');


export default class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.isComponentMounted = false;
    this.state = questionnaireModel;

    // listen to updates
    questionsModel.updated.add(this.onQuestionsModelUpdated, this);
    this.state.updated.add(this.onModelUpdated, this);
  }

  // react methods definitions
  render() {
    return (
      <div className="questionnaire">
        <form id="questionnaire">
          <Question
            index={this.state.currentQuestion}
            text={this.state.getCurrentQuestionText()}
            responses={this.state.getCurrentResponses()}
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
    this.isComponentMounted = true;
  }

  // methods definitions
  onDownloadRequested() {
    window.open(
      'data:text/json;charset=utf-8,' +
      responsesModel.getResponsesJSON()
    );
  }

  onModelUpdated() {
    if (!this.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }

  onNextQuestionRequested() {
    var formElement = document.getElementById('questionnaire');
    questionnaireModel.validateForm(formElement);

    if (formElement.checkValidity()) {
      questionnaireModel.saveResponses();
      questionnaireModel.setFormAsValid(formElement);
      questionnaireModel.gotoNextQuestion();
    }

    window.scrollTo(0, 0);
  }

  onQuestionsModelUpdated() {
    if (!questionsModel.isReady()) {
      return;
    }

    this.state.setRandomVignette();
    this.state.setInitQuestion();
  }
}