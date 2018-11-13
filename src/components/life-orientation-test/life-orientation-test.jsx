import React, { Component } from 'react';
import questionnaireModel from '../../models/questionnaire-model';

// styles
require('./life-orientation-test.scss');


export default class LifeOrientationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false
    };
  }

  // react methods definitions</div>
  render() {
    return (
      <div className={this.getComponentCSSClasses()}>
        <h1>Life Orientation Test</h1>
        <p>TODO</p>
        <div className="buttons-wrapper">
          <button
            className="btn-primary next-btn"
            onClick={this.onSurveyRequested.bind(this)}
          >Begin</button>
        </div>
      </div>
    );
  }


  // methods definitions
  getComponentCSSClasses() {
    let classes = ['life-orientation-test'];
    if (!this.props.isVisible) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }

  onSurveyRequested() {
    questionnaireModel.gotoSurvey();
  }
}
