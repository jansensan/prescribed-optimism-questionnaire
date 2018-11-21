import React, { Component } from 'react';

// styles
require('./conclusion.scss');


export default class Intro extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.getComponentCSSClasses()}>
        <div lang="en">
          <h1 tabIndex="-1">Thank you!</h1>
          <p>Thank you for taking the time to complete our survey. We truly value the information you have provided, and you can rest assured that the answers you have submitted will remain anonymous.</p>
          <p>If you have any comments on the survey or our research, please contact <a href="mailto:mathieu.jansonblanchet01@estudiant.upf.edu">Mat Janson Blanchet</a>.</p>
        </div>
      </div>
    );
  }


  // methods definitions
  getComponentCSSClasses() {
    let classes = ['conclusion'];
    if (!this.props.isVisible) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }
}
