import _ from 'lodash';
import React, { Component } from 'react';

// services
import DatabaseService from '../../services/database-service';
import DOMService from '../../services/dom-service';

// models
import demoQuestionsModel from './demographics-questions-model';
import demoResponsesModel from './demographics-responses-model';
import questionnaireModel from '../../models/questionnaire-model';
import responsesModel from '../../models/responses-model';
import settingsModel from '../../models/settings-model';

// components
import FormErrorsWarning from '../form-errors-warning/form-errors-warning.jsx';
import QuestionnaireProgressBar from '../questionnaire-progress-bar/questionnaire-progress-bar.jsx';

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
      <div className={this.getComponentCSSClasses()} lang={settingsModel.lang}>
        <QuestionnaireProgressBar
          step="10"
        ></QuestionnaireProgressBar>

        <h1 tabIndex="-1">Background Questions</h1>
        <FormErrorsWarning
          isVisible={demoQuestionsModel.isFormInvalid()}
        ></FormErrorsWarning>

        <form id="demographicsForm">
          <section className="form-section gender-section">
            <p>1. {demoQuestionsModel.getGenderQuestionLabel()}</p>
            <input
              type="radio"
              name="gender"
              id="genderFemaleRadio"
              onChange={this.onGenderUpdated.bind(this)}
            />
            <label htmlFor="genderFemaleRadio">
              {demoQuestionsModel.getGenderRadioLabel('female')}
            </label>

            <input
              type="radio"
              name="gender"
              id="genderMaleRadio"
              onChange={this.onGenderUpdated.bind(this)}
            />
            <label htmlFor="genderMaleRadio">
              {demoQuestionsModel.getGenderRadioLabel('male')}
            </label>

            <input
              type="radio"
              name="gender"
              id="genderOtherRadio"
              onChange={this.onGenderUpdated.bind(this)}
            />
            <label htmlFor="genderOtherRadio">
              {demoQuestionsModel.getGenderRadioLabel('other')}
            </label>
          </section>

          <section className="form-section age-section">
            <p>2. {demoQuestionsModel.getAgeQuestionLabel()}</p>
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
            <p>3. {demoQuestionsModel.getEthnicityQuestionLabel()}</p>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityAsian"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityAsian">
                {demoQuestionsModel.getEthnicityRadioLabel('asian')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityBlack"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityBlack">
                {demoQuestionsModel.getEthnicityRadioLabel('black')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityIndigenous"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityIndigenous">
                {demoQuestionsModel.getEthnicityRadioLabel('indigenous')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityLatino"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityLatino">
                {demoQuestionsModel.getEthnicityRadioLabel('latino')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityWhite"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityWhite">
                {demoQuestionsModel.getEthnicityRadioLabel('white')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityOther"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityOther">
                {demoQuestionsModel.getEthnicityRadioLabel('other')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="ethnicity"
                id="ethnicityNoReply"
                onChange={this.onEthnicityUpdated.bind(this)}
              />
              <label htmlFor="ethnicityNoReply">
                {demoQuestionsModel.getEthnicityRadioLabel('noreply')}
              </label>
            </div>
          </section>

          <section className="form-section education-section">
            <p>4. {demoQuestionsModel.getEducationQuestionLabel()}</p>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationElementary"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationElementary">
                {demoQuestionsModel.getEducationRadioLabel('elementary')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationSomeHighSchool"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationSomeHighSchool">
                {demoQuestionsModel.getEducationRadioLabel('someHighSchool')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationHighSchool"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationHighSchool">
                {demoQuestionsModel.getEducationRadioLabel('highSchool')}
              </label>
            </div>

            {/*
            // college is an american concept, doesn't apply currently
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationSomeCollege"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationSomeCollege">
                {demoQuestionsModel.getEducationRadioLabel('someCollege')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationCollege"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationCollege">
                {demoQuestionsModel.getEducationRadioLabel('college')}
              </label>
            </div>
            */}

            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationSomeBA"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationSomeBA">
                {demoQuestionsModel.getEducationRadioLabel('someBA')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationBA"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationBA">
                {demoQuestionsModel.getEducationRadioLabel('ba')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationSomeMA"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationSomeMA">
                {demoQuestionsModel.getEducationRadioLabel('someMA')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationMA"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationMA">
                {demoQuestionsModel.getEducationRadioLabel('ma')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationSomePhD"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationSomePhD">
                {demoQuestionsModel.getEducationRadioLabel('somePhD')}
              </label>
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="education"
                id="educationPhD"
                onChange={this.onEducationUpdated.bind(this)}
              />
              <label htmlFor="educationPhD">
                {demoQuestionsModel.getEducationRadioLabel('phd')}
              </label>
            </div>
          </section>

          <section className="form-section study-section">
            <p>5. {demoQuestionsModel.getStudiesQuestionLabel()}</p>
            <input
              type="radio"
              name="isStudying"
              id="isStudyingYes"
              onChange={this.onStudyStateUpdated.bind(this)}
            />
            <label htmlFor="isStudyingYes">
              {demoQuestionsModel.getStudiesResponseLabel('isStudyingYes')}
            </label>
            <input
              type="radio"
              name="isStudying"
              id="isStudyingNo"
              onChange={this.onStudyStateUpdated.bind(this)}
            />
            <label htmlFor="isStudyingNo">
              {demoQuestionsModel.getStudiesResponseLabel('isStudyingNo')}
            </label>
          </section>

          <section className="form-section work-section">
            <p>6. {demoQuestionsModel.getWorkQuestionLabel()}</p>
            <input
              type="radio"
              name="isWorking"
              id="isWorkingYes"
              onChange={this.onWorkStateUpdated.bind(this)}
            />
            <label htmlFor="isWorkingYes">
              {demoQuestionsModel.getWorkResponseLabel('isWorkingYes')}
            </label>
            <input
              type="radio"
              name="isWorking"
              id="isWorkingNo"
              onChange={this.onWorkStateUpdated.bind(this)}
            />
            <label htmlFor="isWorkingNo">
              {demoQuestionsModel.getWorkResponseLabel('isWorkingNo')}
            </label>
          </section>

          <section className="form-section income-section">
            <p>7. {demoQuestionsModel.getIncomeQuestionLabel()}</p>
            <select
              id="incomeOptions"
              name="incomeOptions"
              onChange={this.onIncomeUpdated.bind(this)}
            >
              {this.renderIncomeOptions()}
            </select>
          </section>

          <section className="form-section household-section">
            <p>8. {demoQuestionsModel.getNumPeopleHouseholdLabel()}</p>
            <input
              id="numPeopleHouseholdInput"
              type="number"
              name="numPeopleHousehold"
              min="0"
              value={demoResponsesModel.numPeopleHousehold}
              onChange={this.onNumHouseholdPeopleUpdated.bind(this)}
            />
          </section>
        </form>

        <div className="buttons-wrapper">
          <button
            id="completeQuestionnaireButton"
            className="btn-primary btn-complete-questionnaire"
            onClick={this.onQuestionnaireCompleted.bind(this)}
          >
            <span className="active-label">{settingsModel.getButtonLabel('finish')}</span>
            <span className="disabled-label">⌛</span>
          </button>
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

  onIncomeUpdated(event) {
    demoResponsesModel.setIncome(event.target.value);
  }

  onNumHouseholdPeopleUpdated(event) {
    demoResponsesModel.setNumHouseholdPeople(event.target.value);
  }

  onQuestionnaireCompleted() {
    let formElement = document.getElementById('demographicsForm');
    demoQuestionsModel.validateForm();

    // form is valid
    if (formElement.checkValidity()) {
      // disable button while saving to db
      var btn = document.getElementById('completeQuestionnaireButton');
      btn.disabled = true;

      // send data to db
      DatabaseService.saveData(
        settingsModel.baseURL,
        questionnaireModel.startTime.getTime(),
        settingsModel.lang,
        responsesModel.getResponsesJSON(),
        settingsModel.isDebugMode()
      ).then(() => {
        // scroll to top
        this.scrollToTop();

        // go to thank you page
        questionnaireModel.isCompleted = true;
        questionnaireModel.gotoConclusion();
      });

    // form is invalid
    } else {
      this.scrollToTop();
    }
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

  renderIncomeOptions() {
    // set initial options
    let options = [];
    options.push(<option value="-1">———</option>);

    // loop through data
    let optionsData = demoQuestionsModel.getIncomeOptions();
    _.forEach(
      optionsData,
      (option, i) => {
        options.push(
          <option key={i} value={i}>{option}</option>
        );
      }
    );

    return options;
  }

  scrollToTop() {
    DOMService.scrollToTop()
      .then(() => {
        DOMService.setFocus(
          document.getElementsByTagName('h1')[0]
        );
      });
  }

  update() {
    if (!this.state.isComponentMounted) {
      return;
    }
    this.forceUpdate();
  }
}
