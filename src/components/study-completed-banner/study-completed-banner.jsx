import React, { Component } from 'react';

// models
import settingsModel from '../../models/settings-model';

// styles
require('./study-completed-banner.scss');


export default class StudyCompletedBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComponentMounted: false
    }
  }

  // react methods definitions
  render() {
    return (
      <aside className={this.getClassNames()}>
        <div className="label">✅ Thank you! Our study is now completed. You may still use the questionnaire, but we will not save any data.</div>
      </aside>
    );
  }

  componentDidMount() {
    this.setState({
      isComponentMounted: true
    });
  }


  // methods definitions
  getClassNames() {
    let classes = ['study-completed-banner'];
    if (settingsModel.isStudyCompleted()) {
      classes.push('visible');
    }
    return classes.join(' ');
  }
}
