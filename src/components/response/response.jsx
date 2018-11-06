import _ from 'lodash';
import React, { Component } from 'react';

// models
import settingModel from '../../models/settings-model';

// styles
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
    // generate num labels cells
    let cellWidth = Math.floor(100 / this.getNumSteps()) + '%';
    let cells = [];
    let label = '';
    let type = _.get(this.props, 'type.stepType');
    let additionalLabels = _.get(this.props, 'type.additionalLabels');
    for (let i = 0; i < this.getNumSteps(); i++) {
      switch(type) {
        case 'int':
          label = i + this.getMin();
          break;
        case 'percentage':
          label = i * 10 + '%';
          break;
      }

      // check if additional label
      let additionalLabel = _.get(
        _.find(additionalLabels, {index: i}),
        settingModel.lang
      );
      let hasAdditLabel = !_.isUndefined(additionalLabel);

      // add cell
      cells.push(
        <td
          style={{"width": cellWidth}}
          key={i}
        >
          <p className="numeric-label">{label}</p>
          {
            hasAdditLabel &&
            <p className="addit-label">{additionalLabel}</p>
          }
        </td>
      );
    }

    // return component
    return (
      <div className="response">
        <p>{this.getLabel()}</p>
        <form action="">
          <input
            type="range"
            name={this.getInputName()}
            min={this.getMin()}
            max={this.getMax()}
            step={this.getStepSize()}
            value={this.state.value}
            onChange={this.onRangeChanged.bind(this)}
          />
          <table className="response-num-label">
            <tbody>
              <tr>
                {cells}
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidMount() { 
    this.isComponentMounted = true;
    this.state.value = this.getInitialValue();
    this.update();
  }


  // methods definitions
  getInputName() {
    return this.props.vignetteId + 'Range' + this.props.index;
  }

  getInitialValue() {
    let val = _.get(this.props, 'type.initVal');
    return parseInt(val, 10);
  }

  getLabel() {
    return _.get(this.props.label, this.props.lang);
  }

  getNumSteps() {
    let type = _.get(this.props, 'type.stepType');
    let numSteps = -1;
    switch(type) {
      case 'int':
        numSteps = this.getMax() - this.getMin() + 1;
        break;
      case 'percentage':
        numSteps = 11;
        break;
    }
    return parseInt(numSteps, 10);
  }

  getMin() {
    let min = _.get(this.props, 'type.min');
    return parseInt(min, 10);
  }
  
  getMax() {
    let max = _.get(this.props, 'type.max');
    return parseInt(max, 10);
  }

  getStepSize() {
    return _.get(this.props, 'type.step');
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