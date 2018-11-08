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
        responses: []
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

  setSurveyResponseModel(questionId, model) {
    let r = this.getSurveyResponsesForQuestion(questionId);

    // prevent adding responses if there are already
    if (r.responses.length >= this.NUM_RESPONSES) {
      return;
    }

    r.responses.push(model);
  }
}


// create and export singleton
let responsesModel = new ResponsesModel();
export default responsesModel;
