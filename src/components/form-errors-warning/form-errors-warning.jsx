import React, { Component } from 'react';

require('./form-errors-warning.scss');

export default class FormErrorsWarning extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <p className={this.getClassNames()}>Please ensure to respond to all the questions below.</p>
    );
  }


  // methods definitions
  getClassNames() {
    let classes = ['form-errors-warning'];
    if (this.props.isVisible) {
      classes.push('visible');
    }
    return classes.join(' ');
  }
}
