import React, { Component } from 'react';

// services
import DOMService from '../../services/dom-service';

// models
import questionnaireModel from '../../models/questionnaire-model';

// styles
require('./intro.scss');


export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false
    };
  }

  // react methods definitions
  render() {
    return (
      <div className={this.getComponentCSSClasses()}>
        <div lang="en">
          <h1 tabIndex="-1">Intro</h1>
          <p>You will be presented with eight different hypothetical situations. Carefully read each situation and answer the questions. This survey will only take a few minutes to complete.</p>
          <p>We will not collect any nominal data, and please be assured that the information you provide will be kept in the strictest confidentiality, and will not be used for commercial or any other purposes beyond this academic study.</p>
          <p>Thank you for participating in our important survey!</p>
          <div className="buttons-wrapper">
            <button
              className="btn-primary next-btn"
              onClick={this.onBeginRequested.bind(this)}
            >Begin</button>
          </div>
        </div>
      </div>
    )
  }


  // methods definitions
  getComponentCSSClasses() {
    let classes = ['intro'];
    if (!this.props.isVisible) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }

  onBeginRequested() {
    questionnaireModel.gotoLifeOrientationTest();

    DOMService.scrollToTop()
      .then(() => {
        DOMService.setFocus(
          document.getElementsByTagName('h1')[0]
        );
      });
  }
}
