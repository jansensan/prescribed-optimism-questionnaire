import React, { Component } from 'react';

// components
import DownloadButton from '../download-button/download-button.jsx';

// styles
require('./conclusion.scss');


export default class Intro extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.getComponentCSSClasses()}>
        <h1>Thank you!</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <DownloadButton/>
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
