import React, { Component } from 'react';

// models
import LOTResponseModel from './lot-response-model.js';

// styles
require('./lot-response.scss');


export default class LOTResponse extends Component {
  constructor(props) {
    super(props);

    // constants
    this.NUM_OPTIONS = 5;

    // properties
    this.isComponentMounted = false;

    // properties
    this.state = new LOTResponseModel();
    this.state.setData(this.props);
  }

  // react methods definitions
  render() {
    return (
      <div className="lot-response">
        <input
          type="range"
          name={this.state.getName()}
          min="1"
          max="5"
          step="1"
          value={this.state.value}
          onChange={this.onRangeChanged.bind(this)}
        />
        <table className="response-num-label">
          <tbody>
            <tr>
              {this.getNumericLabelCells()}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() { 
    this.isComponentMounted = true;
    this.state.setInitialValue();
  }


  // methods definitions
  getNumericLabelCells() {
    // generate num labels cells
    let cells = [];
    for (let i = 0; i < this.NUM_OPTIONS; i++) {
      cells.push(
        <td
          style={{"width": "20%"}}
          key={i}
        >
          <p className="numeric-label">{i + 1}</p>
          <p className="addit-label">{this.state.getRatingResponseAt(i)}</p>
        </td>
      );
    }
    return cells;
  }

  onRangeChanged() {
    this.state.setAsChanged();
    this.state.setValue(event.target.value);

    // TODO: save lot response to model. see response.jsx
  }
}