import _ from 'lodash';
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
    this.state = {
      isComponentMounted: false
    };

    // listen to updates
    questionnaireModel.updated.add(this.onModelUpdated, this);
  }

  // react methods definitions
  render() {
    return (
      <div className="question">
        <h1>Question {questionnaireModel.getQuestionNumber()}</h1>
        <p>{this.props.text}</p>
        <p className={this.getFormClasses()}>Please ensure to respond to all the questions below.</p>
        {
          // only render once the question index is set
          (this.props.index > -1) ?

            // go through all responses data
            // and create a component for each

            this.getShuffledResponses().map((response, i) => (
              <Response
                key={i}
                index={i}
                orderIndex={response.id}
                questionIndex={this.props.index}
                vignetteId={questionnaireModel.getCurrentVignetteId()}
                label={response.label}
                type={response.type}
              ></Response>
            ))
          : <p className="fix-form-errors">An error occured, please <button className="refresh-btn" onClick={this.onUpdateRequested.bind(this)}>refresh the page</button>.</p>
        }
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isComponentMounted: true
    });
  }

  // methods definitions
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

  getShuffledResponses() {
    return _.shuffle(this.props.responses);
  }

  onModelUpdated() {
    this.update();
  }

  onUpdateRequested() {
    this.update();
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}