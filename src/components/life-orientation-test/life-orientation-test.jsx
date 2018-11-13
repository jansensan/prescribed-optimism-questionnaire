import React, { Component } from 'react';

// models
import lotModel from './life-orientation-test-model';
import questionnaireModel from '../../models/questionnaire-model';

// components

// styles
require('./life-orientation-test.scss');


export default class LifeOrientationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false
    };

    // listen to updates
    questionnaireModel.updated.add(this.update, this);
  }

  // react methods definitions</div>
  render() {
    return (
      <div className={this.getComponentCSSClasses()}>
        <h1>Life Orientation Test</h1>
        <form id="surveyForm">
          {/* <Question
            index={-1}
            text={lotModel.getText()}
            responses={lotModel.getResponses()}
          ></Question> */}
        </form>
        <div className="buttons-wrapper">
          <button
            className="btn-primary next-btn"
            onClick={this.onSurveyRequested.bind(this)}
          >Continue</button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isComponentMounted: true
    });
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

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}
