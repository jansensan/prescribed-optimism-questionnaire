import React, { Component } from 'react';

require('./response.scss');

export default class Response extends Component {
  constructor(props) {
    super(props);
  }

  // react methods definitions
  render() {
    return (
      <div className="response">
        <p>{this.getLabel()}</p>
        <p>{this.getInputName()}</p>
        <p>From {this.getMin()} to {this.getMax()}</p>
        <p>Step size of {this.getStepSize()}</p>
        <p>Init value of {this.getInitialValue()}</p>
        {
          this.isLikertScale() &&
            <input
              type="range"
              min={this.getMin()}
              max={this.getMax()}
              step={this.getStepSize()}
            />
        }

      </div>
    );
  }

  getInputName() {
    var name = this.props.vignetteId + 'Range' + this.props.index;
    return name;
  }

  getInitialValue() {
    let unitType = _.get(this.props, 'type.unit');
    let numSteps = _.get(this.props, 'type.numSteps');

    let val = 0;
    switch (unitType) {
      case 'uint':
        val = Math.floor(numSteps / 2);
        break;

      case 'int':
        val = 0;
        break;

      case 'percentage':
        val = 50;
        break;
    }
    return val;
  }

  getLabel() {
    return _.get(this.props.label, this.props.lang);
  }

  getMin() {
    let unitType = _.get(this.props, 'type.unit');

    let min = 0;
    switch (unitType) {
      case 'uint':
      case 'percentage':
        min = 0;
      break;

      case 'int':
        let numSteps = _.get(this.props, 'type.numSteps');
        min = -Math.floor(numSteps / 2);
        break;
    }
    return min;
  }

  getMax() {
    let unitType = _.get(this.props, 'type.unit');
    let numSteps = _.get(this.props, 'type.numSteps');

    let max = 0;
    switch (unitType) {
      case 'uint':
        max = numSteps;
        break;

      case 'int':
        max = Math.floor(numSteps / 2);
        break;

      case 'percentage':
        max = 100;
        break;
    }
    return max;
  }

  getStepSize() {
    let unitType = _.get(this.props, 'type.unit');

    var stepSize = 1;
    switch (unitType) {
      case 'uint':
      case 'int':
        stepSize = 1;
        break;

      case 'percentage':
        stepSize = 10;
        break;
    }
    return stepSize;
  }

  isLikertScale() {
    return _.get(this.props.type, 'scale') === 'likert';
  }
}