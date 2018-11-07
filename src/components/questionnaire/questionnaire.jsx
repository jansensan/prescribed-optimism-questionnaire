import React, { Component } from 'react';

// model
import questionnaireModel from './questionnaire-model';
import questionsModel from '../../models/questions-model';
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
        <Question
          text={this.state.getCurrentQuestionText()}
          responses={this.state.getCurrentResponses()}
        ></Question>
        <button className="btn-primary">Next</button>
      </div>
    );
  }

  componentDidMount() { 
    this.isComponentMounted = true;
  }

  // methods definitions
  onModelUpdated() {
    if (!this.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }

  onQuestionsModelUpdated() {
    if (!questionsModel.isReady()) {
      return;
    }

    this.state.setRandomVignette();
    this.state.setCurrentQuestion(0);
  }
}