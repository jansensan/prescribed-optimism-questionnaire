import React, { Component } from 'react';

// models
import settingsModel from '../../models/settings-model';

// styles
require('./debug-banner.scss');


export default class DebugBanner extends Component {
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
        <div className="label">⚠️ Warning: currently in debug mode, no data will be saved to the database.</div>
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
    let classes = ['debug-banner'];
    if (settingsModel.isDebugMode()) {
      classes.push('visible');
    }
    return classes.join(' ');
  }
}
