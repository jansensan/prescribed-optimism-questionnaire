import _ from 'lodash';
import React, { Component } from 'react';


// models
import surveyModel from '../survey/survey-model.js';

// components
import Response from '../response/response.jsx';
import FormErrorsWarning from '../form-errors-warning/form-errors-warning.jsx';

// styles
require('./question.scss');


export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false
    };

    // listen to updates
    surveyModel.updated.add(this.onModelUpdated, this);
  }

  // react methods definitions
  render() {
    return (
      <div className="question">
        <h1 tabIndex="-1">Question {surveyModel.getQuestionNumber()}</h1>
        <p>{this.props.text}</p>
        <FormErrorsWarning
          isVisible={surveyModel.isFormInvalid()}
        ></FormErrorsWarning>
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
                vignetteId={surveyModel.getCurrentVignetteId()}
                label={response.label}
                type={response.type}
              ></Response>
            ))

          // show an error if question index is not set
          : <p className="page-error-warning">An error occured, please <button className="refresh-btn" onClick={this.onUpdateRequested.bind(this)}>refresh the page</button>.</p>
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