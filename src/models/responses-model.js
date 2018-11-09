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

  saveSurveyResponses(questionId, responses) {
    let q = this.getSurveyResponsesForQuestion(questionId);
    for (let i = 0; i < responses.length; i++) {
      q.responses[i] = responses[i];
    }
  }
}


// create and export singleton
let responsesModel = new ResponsesModel();
export default responsesModel;
