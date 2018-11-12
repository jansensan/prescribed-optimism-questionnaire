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
    this.state = {
      isComponentMounted: false
    };

    // listen to updates
    questionnaireModel.updated.add(this.onModelUpdated, this);
    questionsModel.updated.add(this.onQuestionsModelUpdated, this);
  }

  // react methods definitions
  render() {
    return (
      <div className="questionnaire">
        <form id="questionnaire">
          <Question
            index={questionnaireModel.currentQuestion}
            text={questionnaireModel.getCurrentQuestionText()}
            responses={questionnaireModel.getCurrentResponses()}
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
    if (questionsModel.isReady()) {
      questionnaireModel.setRandomVignette();
      questionnaireModel.setInitQuestion();
    }
  }
}