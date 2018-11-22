import _ from 'lodash';

import demoResponsesModel from "../components/demographics-questions/demographics-responses-model";
import questionnaireModel from './questionnaire-model';


class ResponsesModel {
  constructor() {
    this.NUM_LOT_RESPONSES = 10;
    this.NUM_SURVEY_RESPONSES = 6;

    this.lotResponses = [];
    this.surveyResponses = [];
    this.demographicsResponses = [];
  }

  initLOTResponses() {
    for (let i = 0; i < this.NUM_LOT_RESPONSES; i++) {
      let question = {
        id: 'lotQuestion' + i,
        response: null
      };
      this.lotResponses.push(question);
    }
  }

  initSurveyResponses(vignetteId, questionIndexes) {
    this.surveyResponses = {
      vignetteId: vignetteId,
      responses: []
    };

    for (let i = 0; i < questionIndexes.length; i++) {
      let question = {
        questionId: 'question' + questionIndexes[i],
        responses: Array(this.NUM_SURVEY_RESPONSES)
      };
      this.surveyResponses.responses.push(question);
    }
  }

  getResponsesJSON() {
    // timestamp
    let now = new Date();

    // format survey responses for json
    let surveyForJSON = {
      vignette: this.surveyResponses.vignetteId,
      responses: Array(this.NUM_SURVEY_RESPONSES)
    };
    this.surveyResponses.responses.forEach((q, i) => {
      let index = parseInt(q.questionId.split('question')[1], 10);
      surveyForJSON.responses[index] = q.responses;
    });

    // format demographics responses for json
    let demographicsForJSON = {
      gender: demoResponsesModel.gender,
      age: demoResponsesModel.age,
      ethnicity: demoResponsesModel.ethnicity,
      education: demoResponsesModel.education,
      isWorking: demoResponsesModel.isWorking,
      isStudying: demoResponsesModel.isStudying,
      income: demoResponsesModel.income,
    };

    return JSON.stringify({
      time: {
        start: questionnaireModel.startTime,
        end: now,
      },
      timestamp: {
        start: questionnaireModel.startTime.getTime(),
        end: now.getTime(),
      },
      lifeOrientationTest: this.lotResponses,
      survey: surveyForJSON,
      demographics: demographicsForJSON
    });
  }

  getSurveyResponsesForQuestion(questionId) {
    // error check
    if (_.isNumber(questionId)) {
      questionId = 'question' + questionId;
    }
    return _.find(
      this.surveyResponses.responses,
      {questionId: questionId}
    );
  }

  saveLOTResponses(responses) {
    this.lotResponses = responses;
  }

  saveSurveyResponseAt(questionId, orderIndex, value) {
    let q = this.getSurveyResponsesForQuestion(questionId);
    q.responses[orderIndex] = value;
  }
}


// create and export singleton
let responsesModel = new ResponsesModel();
export default responsesModel;
