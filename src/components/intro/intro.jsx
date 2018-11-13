import React, { Component } from 'react';

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
        <h1>Intro</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <div className="buttons-wrapper">
          <button
            className="btn-primary next-btn"
            onClick={this.onBeginRequested.bind(this)}
          >Begin</button>
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
    window.scrollTo(0, 0);
  }
}
