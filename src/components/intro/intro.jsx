import React, { Component } from 'react';

// services
import DOMService from '../../services/dom-service';

// models
import questionnaireModel from '../../models/questionnaire-model';
import settingsModel from '../../models/settings-model';

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
      <div className={this.getComponentCSSClasses()} lang={settingsModel.lang}>
        <h1 tabIndex="-1">Intro</h1>

        {
          settingsModel.isLanguageEnglish() &&
          <div lang="en">
            <p>You will be presented with eight different hypothetical situations. In each of them, you will have to offer your opinion: what should the person in the story should do, what would you do, what is ideal to do, etc. Carefully read each situation, and answer the questions. This survey will only take a few minutes to complete.</p>
            <p>We are a group of students at Universitat Pompeu Fabra conducting a survey in the context of a research course.</p>
            <p>We will not collect any nominal data, and please be assured that the information you provide will be kept in the strictest confidentiality, and will not be used for commercial or any other purposes beyond this academic study.</p>
            <p>Thank you for participating in our important survey!</p>
          </div>
        }

        {
          settingsModel.isLanguageCastillan() &&
          <div lang="es">
            <p>Le presentaremos ocho distintas situaciones hipotéticas. Lea cada situación con atención y responda a las preguntas. Tardará pocos minutos en realizar la encuesta.</p>
            <p>Somos un grupo de alumnos de la Universidad Pompeu Fabra, llevando a cabo una encuesta en el contexto de una investigación científica.</p>
            <p>No vamos a guardar ningún tipo de información nominal, y por esté seguro que la información que aporte será tratada con la más estricta confidencialidad, y no será usada con fines comerciales ni con ningún otro fin, más allá de el presente estudio académico.</p>
            <p>¡Muchas gracias por participar en nuestra encuesta!</p>
          </div>
        }

        {
          settingsModel.isLanguageCatalan() &&
          <div lang="ca">
            <p>L'hi presentarem vuit diferents situacions hipotètiques. Llegeixi cada situació amb atenció i respongui a les preguntes. Trigarà pocs minuts en completar l'enquesta.</p>
            <p>Som un grup d'alumnes de la Universitat Pompeu Fabra, duent a terme una enquesta en el context d'una investigació científica.</p>
            <p>No guardarem cap tipus d'informació nominal, i estigui segur/a que la información que ens aporti serà tractada amb la més estricta confidencialitat, i no serà utilitzada per fins comercials ni cap altre finalitat més enllà del present estudi acadèmic.</p>
            <p>Moltes gràcies per participar en la nostra enquesta!</p>
          </div>
        }

        <div className="buttons-wrapper">
          <button
            className="btn-primary next-btn"
            onClick={this.onBeginRequested.bind(this)}
          >{settingsModel.getButtonLabel('begin')}</button>
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
