import React, { Component } from 'react';

require('./response.scss');

export default class Response extends Component {
  constructor(props) {
    super(props);
    this.isComponentMounted = false;
    this.state = {
      value: -1
    };
  }

  // react methods definitions
  render() {
    return (
      <div className="response">
        <p>{this.getLabel()}</p>
        <form action="">
          {
            this.isLikertScale() &&
              <input
                type="range"
                name={this.getInputName()}
                min={this.getMin()}
                max={this.getMax()}
                step={this.getStepSize()}
                value={this.state.value}
                onChange={this.onRangeChanged.bind(this)}
              />
          }
        </form>
      </div>
    );
  }

  componentDidMount() { 
    this.isComponentMounted = true;
  }


  // methods definitions
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

  setInitialValue() {
    this.state.value = getInitialValue();
    this.update();
  }

  onRangeChanged(event) {
    this.state.value = event.target.value;
    this.update();
  }

  update() {
    if (!this.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}