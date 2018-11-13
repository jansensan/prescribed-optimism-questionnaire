import React, { Component } from 'react';

// models
import settingsModel from '../../models/settings-model.js';

// components
import LOTResponse from '../lot-response/lot-response.jsx';
import lotModel from '../life-orientation-test/life-orientation-test-model.js';

// styles
require('./lot-question.scss');


export default class LOTQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false
    };

    // listen to updates
  }

  // react methods definitions
  render() {
    return (
      <div className="lot-question">
        <p>{this.props.index + 1}. {this.getLabel()}</p>
        <LOTResponse
          index={this.props.index}
          ratingResponses={this.getResponses()}
        ></LOTResponse>
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
  getLabel() {
    return _.get(this.props.label, settingsModel.lang);
  }

  getResponses() {
    let responses = [];
    for (let i = 0; i < this.props.responses.length; i++) {
      responses.push(_.get(this.props.responses[i], settingsModel.lang));
    }
    return responses;
  }
}
