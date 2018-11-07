import React, { Component } from 'react';

// models
import ResponseModel from './response-model';

// styles
require('./response.scss');


export default class Response extends Component {
  constructor(props) {
    super(props);

    // properties
    this.isComponentMounted = false;

    // init state
    this.state = new ResponseModel();
    this.state.setData(this.props);

    // listen to updates
    this.state.updated.add(this.onModelUpdated, this);
  }

  // react methods definitions
  render() {
    // generate num labels cells
    let cellWidth = Math.floor(100 / this.state.getNumSteps()) + '%';
    let cells = [];
    let label = '';
    for (let i = 0; i < this.state.getNumSteps(); i++) {
      switch(this.state.getStepType()) {
        case 'int':
          label = i + this.state.getMin();
          break;
        case 'percentage':
          label = i * 10 + '%';
          break;
      }

      // check if additional label
      let additionalLabel = this.state.getAdditionalLabelAtIndex(i);
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
        <p>{this.state.getLabel()}</p>
        <form action="">
          <input
            type="range"
            name={this.state.getInputName()}
            min={this.state.getMin()}
            max={this.state.getMax()}
            step={this.state.getStepSize()}
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
    this.state.setInitialValue();
  }


  // methods definitions
  onRangeChanged(event) {
    this.state.setValue(event.target.value);
  }

  onModelUpdated() {
    if (!this.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}