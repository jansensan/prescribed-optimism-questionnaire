import React, { Component } from 'react';

// models

// components

// styles
require('./demographics-questions.scss');


export default class DemographicsQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false
    };

    // listen to updates
    // questionnaireModel.updated.add(this.update, this);
    // lotModel.updated.add(this.update, this);
  }

  // react methods definitions</div>
  render() {
    return (
      <div className={this.getComponentCSSClasses()}>
        <h1>Background Questions</h1>
        <form id="demographicsForm">
          <section className="form-section gender-section">
            <p>1. What is your gender?</p>
            <input type="radio" name="gender" id="genderFemaleRadio"/>
            <label htmlFor="genderFemaleRadio">Female</label>
            <input type="radio" name="gender" id="genderMaleRadio"/>
            <label htmlFor="genderMaleRadio">Male</label>
            <input type="radio" name="gender" id="genderOtherRadio"/>
            <label htmlFor="genderOtherRadio">Other</label>
          </section>
          <section className="form-section age-section">
            <p>2. How old are you?</p>
            <input
              id="ageInput"
              type="number"
              name="age"
              min="18"
              max="150"
            />
          </section>
          <section className="form-section ethnicity-section">
            <p>3. To which ethnicity do you identify most?</p>
            <div className="radio-wrapper">
              <input type="radio" name="ethnicity" id="ethnicityAsian"/>
              <label htmlFor="ethnicityAsian">Asian or Pacific Islander</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="ethnicity" id="ethnicityBlack"/>
              <label htmlFor="ethnicityBlack">Black</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="ethnicity" id="ethnicityIndigenous"/>
              <label htmlFor="ethnicityIndigenous">Indigenous from North/South American</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="ethnicity" id="ethnicityLatino"/>
              <label htmlFor="ethnicityLatino">Latino</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="ethnicity" id="ethnicityWhite"/>
              <label htmlFor="ethnicityWhite">White</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="ethnicity" id="ethnicityMixed"/>
              <label htmlFor="ethnicityMixed">Mixed/Other</label>
          </div>
          </section>
          <section className="form-section education-section">
            <p>4. What is your level of education?</p>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationElementary"/>
              <label htmlFor="educationElementary">Elementary school</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationSomeHighSchool"/>
              <label htmlFor="educationSomeHighSchool">Some high school</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationHighSchool"/>
              <label htmlFor="educationHighSchool">High school</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationSomeCollege"/>
              <label htmlFor="educationSomeCollege">Some college</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationCollege"/>
              <label htmlFor="educationCollege">College</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationSomeBA"/>
              <label htmlFor="educationSomeBA">Part of Bachelor's degree</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationBA"/>
              <label htmlFor="educationBA">Bachelor's degree</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationSomeMA"/>
              <label htmlFor="educationSomeMA">Part of Master's degree</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationMA"/>
              <label htmlFor="educationMA">Master's degree</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationSomePhD"/>
              <label htmlFor="educationSomePhD">Part of PhD</label>
            </div>
            <div className="radio-wrapper">
              <input type="radio" name="education" id="educationPhD"/>
              <label htmlFor="educationPhD">PhD</label>
            </div>
          </section>
          <section className="form-section study-section">
            <p>5. Are you currently studying?</p>
            <input type="radio" name="isStudying" id="isStudyingYes"/>
            <label htmlFor="isStudyingYes">Yes</label>
            <input type="radio" name="isStudying" id="isStudyingNo"/>
            <label htmlFor="isStudyingNo">No</label>
          </section>
          <section className="form-section work-section">
            <p>5. Are you currently working/employed (whether full-time or part-time)?</p>
            <input type="radio" name="isWorking" id="isWorkingYes"/>
            <label htmlFor="isWorkingYes">Yes</label>
            <input type="radio" name="isWorking" id="isWorkingNo"/>
            <label htmlFor="isWorkingNo">No</label>
          </section>
        </form>
        <div className="buttons-wrapper">
          <button
            className="btn-primary next-btn"
            onClick={this.onQuestionnaireCompleted.bind(this)}
          >Finish</button>
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
    let classes = ['demographics-questions'];
    if (!this.props.isVisible) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }

  onQuestionnaireCompleted() {
    // var formElement = document.getElementById('lotForm');
    // lotModel.validateForm(formElement);

    // if (formElement.checkValidity()) {
      // surveyModel.saveResponses();
      // lotModel.setFormAsValid(formElement);
      // questionnaireModel.gotoSurvey();
    // }

    window.scrollTo(0, 0);
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }

    this.forceUpdate();
  }
}
