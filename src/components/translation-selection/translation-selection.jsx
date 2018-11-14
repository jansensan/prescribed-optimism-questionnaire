import React, { Component } from 'react';

// constants
import { Languages } from '../../constants/languages';

// models
import settingsModel from '../../models/settings-model';

// styles
require('./translation-selection.scss');


export default class TranslationSelection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.getComponentsClasses()}>
        <fieldset className="lang-sel-fieldset">
          <button onClick={this.onEnglishSelected} className="btn-primary">EN</button>
          <button onClick={this.onSpanishSelected} className="btn-primary">ES</button>
          <button onClick={this.onCatalanSelected} className="btn-primary">CA</button>
        </fieldset>
      </div>
    );
  }


  // methods definitions
  getComponentsClasses() {
    let classes = ['translation-selection'];
    if (!settingsModel.areTranslationsReady()) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }

  onCatalanSelected() {
    settingsModel.setLanguage(Languages.CA);
  }
  
  onEnglishSelected() {
    settingsModel.setLanguage(Languages.EN);
  }
  
  onSpanishSelected() {
    settingsModel.setLanguage(Languages.ES);
  }
}
