import React, { Component } from 'react';

// styles
require('./questionnaire-progress-bar.scss');

export default class QuestionnaireProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="questionnaire-progress-bar">
        <div className="label">{this.getPercentageLabel()}</div>
        <div className="progress" style={this.getWidth()}></div>
      </aside>
    );
  }

  getPercentageLabel() {
    return (this.props.step * 10) + '%';
  }

  getWidth() {
    return {
      width: this.getPercentageLabel()
    };
  }
}