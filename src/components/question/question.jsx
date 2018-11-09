import React, { Component } from 'react';

// models
import questionnaireModel from '../questionnaire/questionnaire-model.js';

// components
import Response from '../response/response.jsx';

// styles
require('./question.scss');


export default class Question extends Component {
  constructor(props) {
    super(props);
  }

  // react methods definitions
  render() {
    return (
      <div className="question">
        <h1>Question {questionnaireModel.getQuestionNumber()}</h1>
        <p>{this.props.text}</p>
        <p className={this.getFormClasses()}>Please ensure to respond to all the questions below.</p>
        {
          // only render once the question index is se
          (this.props.index > 0) &&

            // go through all responses data
            // and create a component for each
            this.props.responses.map((response, i) => (
              <Response
                key={i}
                index={i}
                questionIndex={this.props.index}
                vignetteId={questionnaireModel.getCurrentVignetteId()}
                label={response.label}
                type={response.type}
              ></Response>
            ))
        }
      </div>
    );
  }

  getFormClasses() {
    let classes = ['fix-form-errors'];
    switch(questionnaireModel.formState) {
      case 'not submitted':
        classes.push('not-submitted');
        break;

      case 'invalid':
        classes.push('invalid');
        break;

      case 'valid':
        classes.push('valid');
        break;
    }
    return classes.join(' ');
  }
}