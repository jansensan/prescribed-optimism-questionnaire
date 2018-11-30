# Questionnaire Responses Data Format

```
{
  // An array of responses
  "responses": [
    {
      // Id of the reponse in the database.
      "id": [String] "10",
      
      // Language in which the questionnaire was completed
      "lang": [String] en|es|ca

      // Response data
      "data": {

        // Start/end times of questionnaire.
        "time": {
          "start": [Date] "2018-XX-XXT00:00:00.000Z",
          "end": [Date] "2018-XX-XXT00:00:00.000Z"
        },

        // Start/end times of questionnaire. Milliseconds since Jan 1, 1970, 00:00:00.000 GMT.
        "timestamp": {
          "start": [String] "0000000000000",
          "end": [String] "0000000000000"
        },

        // Life Orientation test responses.
        // Same order as in LOT.pdf
        "lifeOrientationTest": [
          [Num. Range] [1 — 5],
          [Num. Range] [1 — 5],
          [Num. Range] [1 — 5],
          [Num. Range] [1 — 5],
          [Num. Range] [1 — 5],
          [Num. Range] [1 — 5],
          [Num. Range] [1 — 5],
          [Num. Range] [1 — 5],
          [Num. Range] [1 — 5],
          [Num. Range] [1 — 5]
        ],

        // Questionnaire responses.
        "survey": {

          // vignette id
          "vignette": [String] awardDecision|investmentDecision|partyDecision|surgeryDecision,

          // Array of 8 different scenarios responses, in same order as prescribed-optimism-appendix.pdf.
          // Each entry ordered like responses in Award_Decision.pdf (and the 3 other PDFs as well).
          "responses": [
            [
              [Num. Range] [-4 — 4],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 10],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100]
            ],
            [
              [Num. Range] [-4 — 4],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 10],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100]
            ],
            [
              [Num. Range] [-4 — 4],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 10],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100]
            ],
            [
              [Num. Range] [-4 — 4],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 10],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100]
            ],
            [
              [Num. Range] [-4 — 4],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 10],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100]
            ],
            [
              [Num. Range] [-4 — 4],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 10],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100]
            ],
            [
              [Num. Range] [-4 — 4],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 10],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100]
            ],
            [
              [Num. Range] [-4 — 4],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 10],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100],
              [Num. Range] [0 — 100]
            ]
          ]
        },

        // Demographics responses.
        "demographics": {
          "gender": [String] male|female|other,
          "age": [Num. Range] [1 — 125],
          "ethnicity": [String] asian|black|indigenous|latino|white|other|noreply,
          "education": [String] elementary|someHighSchool|highSchool|someCollege|college|someBA|ba|someMA|ma|somePhD|phd,
          "isWorking": [Boolean] true|false,
          "isStudying": [Boolean] true|false,
          "income": [Num. Range] [0 — 8],
          "numPeopleHousehold": [Number]
        }
      }
    }
  ]
}
```
