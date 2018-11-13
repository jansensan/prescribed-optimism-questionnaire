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
    for (let i = 0; i < questionIndexes.length; i++) {
      let question = {
        vignetteId: vignetteId,
        questionId: 'question' + questionIndexes[i],
        responses: Array(this.NUM_SURVEY_RESPONSES)
      };
      this.surveyResponses.push(question);
    }
  }

  getResponsesJSON() {
    return JSON.stringify(this.surveyResponses);
  }

  getSurveyResponsesForQuestion(questionId) {
    // error check
    if (_.isNumber(questionId)) {
      questionId = 'question' + questionId;
    }
    return _.find(
      this.surveyResponses,
      {questionId: questionId}
    );
  }

  saveLOTResponseAt(index, value) {
    this.lotResponses[index].response = value;
  }

  saveSurveyResponseAt(questionId, orderIndex, value) {
    let q = this.getSurveyResponsesForQuestion(questionId);
    q.responses[orderIndex] = value;
  }
}


// create and export singleton
let responsesModel = new ResponsesModel();
export default responsesModel;
