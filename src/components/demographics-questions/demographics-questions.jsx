import React, { Component } from 'react';

// models
import demoResponsesModel from './demographics-responses-model';
import demoQuestionsModel from './demographics-questions-model';
import questionnaireModel from '../../models/questionnaire-model';

// components
import FormErrorsWarning from '../form-errors-warning/form-errors-warning.jsx';

// styles
require('./demographics-questions.scss');


export default class DemographicsQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false
    };

    // listen to updates
    demoResponsesModel.updated.add(this.update, this);
    demoQuestionsModel.updated.add(this.update, this);
  }

  // react methods definitions
  render() {
    return (
      <div className={this.getComponentCSSClasses()}>
        <h1>Background Questions</h1>
        <FormErrorsWarning
          isVisible={demoQuestionsModel.isFormInvalid()}
        ></FormErrorsWarning>
        <form id="demographicsForm">
          <section className="form-section gender-section">
            <p>1. What is your gender?</p>
            <input
              type="radio"
              name="gender"
              id="genderFemaleRadio"
              onChange={this.onGenderUpdated.bind(this)}
            />
            <label htmlFor="genderFemaleRadio">Female</label>

            <input
              type="radio"
              name="gender"
              id="genderMaleRadio"
              onChange={this.onGenderUpdated.bind(this)}
            />
            <label htmlFor="genderMaleRadio">Male</label>

            <input
              type="radio"
              name="gender"
              id="genderOtherRadio"
              onChange={this.onGenderUpdated.bind(this)}
            />
            <label htmlFor="genderOtherRadio">Other</label>
          </section>

          <section className="form-section age-section">
            <p>2. How old are you?</p>
            <input
              id="ageInput"
              type="number"
              name="age"
              min="0"
              max="150"
              value={demoResponsesModel.age}
              onChange={this.onAgeUpdated.bind(this)}
            />
          </section>

          <section className="form-section ethnicity-section">
            <p>3. To which ethnicity do you identify most?</p>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityAsian"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityAsian">Asian or Pacific Islander</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityBlack"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityBlack">Black</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityIndigenous"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityIndigenous">Indigenous from North/South American</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityLatino"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityLatino">Latino</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityWhite"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityWhite">White</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityOther"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityOther">Mixed/Other</label>
          </div>
          </section>

          <section className="form-section education-section">
            <p>4. What is your level of education?</p>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationElementary"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationElementary">Elementary school</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationSomeHighSchool"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationSomeHighSchool">Some high school</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationHighSchool"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationHighSchool">High school</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationSomeCollege"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationSomeCollege">Some college</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationCollege"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationCollege">College</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationSomeBA"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationSomeBA">Part of Bachelor's degree</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationBA"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationBA">Bachelor's degree</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationSomeMA"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationSomeMA">Part of Master's degree</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationMA"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationMA">Master's degree</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationSomePhD"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationSomePhD">Part of PhD</label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationPhD"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationPhD">PhD</label>
            </div>
          </section>

          <section className="form-section study-section">
            <p>5. Are you currently studying?</p>
            <input
              type="radio"
              name="isStudying"
              id="isStudyingYes"
              onChange={this.onStudyStateUpdated.bind(this)}
            />
            <label htmlFor="isStudyingYes">Yes</label>
            <input
              type="radio"
              name="isStudying"
              id="isStudyingNo"
              onChange={this.onStudyStateUpdated.bind(this)}
            />
            <label htmlFor="isStudyingNo">No</label>
          </section>

          <section className="form-section work-section">
            <p>5. Are you currently working/employed (whether full-time or part-time)?</p>
            <input
              type="radio"
              name="isWorking"
              id="isWorkingYes"
              onChange={this.onWorkStateUpdated.bind(this)}
            />
            <label htmlFor="isWorkingYes">Yes</label>
            <input
              type="radio"
              name="isWorking"
              id="isWorkingNo"
              onChange={this.onWorkStateUpdated.bind(this)}
            />
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
  getComponentCSSClasses() {
    let classes = ['demographics-questions'];
    if (!this.props.isVisible) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }

  onAgeUpdated(event) {
    demoResponsesModel.setAge(event.target.value);
    demoQuestionsModel.setElementsValidity(
      event.target.name,
      demoResponsesModel.getAgeState()
    );
  }

  onEducationUpdated(event) {
    let value = '';
    switch (event.target.id) {
      case 'educationElementary':
        value = 'elementary';
        break;

      case 'educationSomeHighSchool':
        value = 'someHighSchool';
        break;

      case 'educationHighSchool':
        value = 'highSchool';
        break;

      case 'educationSomeCollege':
        value = 'someCollege';
        break;

      case 'educationCollege':
        value = 'college';
        break;

      case 'educationSomeBA':
        value = 'someBA';
        break;

      case 'educationBA':
        value = 'ba';
        break;

      case 'educationSomeMA':
        value = 'someMA';
        break;

      case 'educationMA':
        value = 'ma';
        break;

      case 'educationSomePhD':
        value = 'somePhD';
        break;

      case 'educationPhD':
        value = 'phd';
        break;
    }
    demoResponsesModel.setEducation(value);
    demoQuestionsModel.setElementsValidity(
      event.target.name,
      demoResponsesModel.getEducationState()
    );
  }

  onEthnicityUpdated(event) {
    let value = '';
    switch (event.target.id) {
      case 'ethnicityAsian':
        value = 'asian';
        break;
      
      case 'ethnicityBlack':
        value = 'black';
        break;
      
      case 'ethnicityIndigenous':
        value = 'indigenous';
        break;
      
      case 'ethnicityLatino':
        value = 'latino';
        break;
      
      case 'ethnicityWhite':
        value = 'white';
        break;
      
      case 'ethnicityOther':
        value = 'other';
        break;
    
    }
    demoResponsesModel.setEthnicity(value);
    demoQuestionsModel.setElementsValidity(
      event.target.name,
      demoResponsesModel.getEthnicityState()
    );
  }

  onGenderUpdated(event) {
    let value = '';
    switch (event.target.id) {
      case 'genderFemaleRadio':
        value = 'female';
        break;
        
      case 'genderMaleRadio':
        value = 'male';
        break;
        
      case 'genderOtherRadio':
        value = 'other';
        break;
    }
    demoResponsesModel.setGender(value);
    demoQuestionsModel.setElementsValidity(
      event.target.name,
      demoResponsesModel.getGenderState()
    );
  }

  onQuestionnaireCompleted() {
    let formElement = document.getElementById('demographicsForm');
    demoQuestionsModel.validateForm();

    if (formElement.checkValidity()) {
      questionnaireModel.isCompleted = true;
      questionnaireModel.gotoConclusion();
    }

    window.scrollTo(0, 0);
    let h1 = document.getElementsByTagName('h1')[0];
    h1.focus();
  }

  onStudyStateUpdated(event) {
    let value = '';
    switch (event.target.id) {
      case 'isStudyingYes':
        value = true;
        break;
        
      case 'isStudyingNo':
        value = false;
        break;
    }
    demoResponsesModel.setStudyState(value);
    demoQuestionsModel.setElementsValidity(
      event.target.name,
      demoResponsesModel.getStudyState()
    );
  }

  onWorkStateUpdated(event) {
    let value = '';
    switch (event.target.id) {
      case 'isWorkingYes':
        value = true;
        break;
        
      case 'isWorkingNo':
        value = false;
        break;
    }
    demoResponsesModel.setWorkState(value);
    demoQuestionsModel.setElementsValidity(
      event.target.name,
      demoResponsesModel.getWorkState()
    );
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }
    this.forceUpdate();
  }
}
