class ResponsesModel {
  constructor() {
    this.NUM_RESPONSES = 6;

    this.lotResponses = [];
    this.surveyResponses = [];
    this.demographicsResponses = [];
  }

  initSurveyResponses(vignetteId, questionIndexes) {
    for (let i = 0; i < questionIndexes.length; i++) {
      let question = {
        vignetteId: vignetteId,
        questionId: 'question' + questionIndexes[i],
        responses: Array(this.NUM_RESPONSES)
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

  saveSurveyResponseAt(questionId, orderIndex, value) {
    let q = this.getSurveyResponsesForQuestion(questionId);
    q.responses[orderIndex] = value;
  }
}


// create and export singleton
let responsesModel = new ResponsesModel();
export default responsesModel;
