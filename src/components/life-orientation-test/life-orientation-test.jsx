import React, { Component } from 'react';

// models
import lotModel from './life-orientation-test-model';
import questionnaireModel from '../../models/questionnaire-model';

// components
import LOTQuestion from '../lot-question/lot-question.jsx';

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
    lotModel.updated.add(this.update, this);
  }

  // react methods definitions</div>
  render() {
    return (
      <div className={this.getComponentCSSClasses()}>
        <h1>Life Orientation Test</h1>
        <p>{lotModel.getText()}</p>
        <p className={this.getFormWarningClasses()}>Please ensure to respond to all the questions below.</p>
        <form id="lotForm">
          {
            lotModel.getQuestions().map((question, i) => (
              <LOTQuestion
                key={i}
                index={i}
                label={question}
                responses={lotModel.getResponses()}
              ></LOTQuestion>
            ))
          }
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
  getFormWarningClasses() {
    let classes = ['fix-form-errors'];
    switch(lotModel.formState) {
      case 'not submitted':
        classes.push('not-submitted');
        break;

      case 'invalid':
        classes.push('invalid');
        break;

      case 'valid':
        classes.push('valid');
        break;
    }
    return classes.join(' ');
  }

  getComponentCSSClasses() {
    let classes = ['life-orientation-test'];
    if (!this.props.isVisible) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }

  onSurveyRequested() {
    var formElement = document.getElementById('lotForm');
    lotModel.validateForm(formElement);

    if (formElement.checkValidity()) {
      // surveyModel.saveResponses();
      lotModel.setFormAsValid(formElement);
      questionnaireModel.gotoSurvey();
    }

    window.scrollTo(0, 0);
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}
