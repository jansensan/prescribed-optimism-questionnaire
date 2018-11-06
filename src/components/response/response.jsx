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
          <input
            type="range"
            name={this.getInputName()}
            min={this.getMin()}
            max={this.getMax()}
            step={this.getStepSize()}
            value={this.state.value}
            onChange={this.onRangeChanged.bind(this)}
          />
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
    var name = this.props.vignetteId + 'Range' + this.props.index;
    return name;
  }

  getInitialValue() {
    return _.get(this.props, 'type.initVal');
  }

  getLabel() {
    return _.get(this.props.label, this.props.lang);
  }

  getMin() {
    return _.get(this.props, 'type.min');
  }

  getMax() {
    return _.get(this.props, 'type.max');
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