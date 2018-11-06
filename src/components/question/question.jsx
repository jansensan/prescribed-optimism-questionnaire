import React, { Component } from 'react';

// models
import questionnaireModel from '../questionnaire/questionnaire-model.js';
import settingsModel from '../../models/settings-model.js';

// components
import Response from '../response/response.jsx';


export default class Question extends Component {
  constructor(props) {
    super(props);
  }

  // react methods definitions
  render() {
    return (
      <div className="question">
        <p>{this.props.text}</p>
        {
          // go through all responses data
          // and create a component for each
          this.props.responses.map((response, i) => (
            <Response
              lang={settingsModel.lang}
              vignetteId={questionnaireModel.getCurrentVignetteId()}
              label={response.label}
              type={response.type}
              key={i}
              index={i}
            ></Response>
          ))
        }
      </div>
    );
  }
}