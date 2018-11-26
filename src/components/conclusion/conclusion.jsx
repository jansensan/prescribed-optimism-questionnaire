import React, { Component } from 'react';

// models
import settingsModel from '../../models/settings-model';

// styles
require('./conclusion.scss');


export default class Intro extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.getComponentCSSClasses()} lang={settingsModel.lang}>

        {
          settingsModel.isLanguageEnglish() &&
          <div>
            <h1 tabIndex="-1">Thank you!</h1>

            <p>Thank you for taking the time to complete our survey. We truly value the information you have provided, and you can rest assured that the answers you have submitted will remain anonymous.</p>
            <p>If you have any comments on the survey or our research, please contact <a href="mailto:mathieu.jansonblanchet01@estudiant.upf.edu">Mat Janson Blanchet</a>.</p>
          </div>
        }

        {
          settingsModel.isLanguageCastillan() &&
          <div>
            <h1 tabIndex="-1">¡Gracias!</h1>

            <p>Gracias por tomarse el tiempo de completar nuestra encuesta. Valoramos enormemente la información que nos ha aportado, y le aseguramos que las respuestas aportadas se mantendrán anónimas.</p>
            <p>Si tienen cualquier comentario respecto a la encuesta o nuestra investigación, por favor pónganse en contacto con <a href="mailto:polricart@schoolhouse.io">Pol Ricart</a>.</p>
          </div>
        }

        {
          settingsModel.isLanguageCatalan() &&
          <div>
            <h1 tabIndex="-1">¡Gracias!</h1>

            <p>Gràcies per prendre's el temps de completar la nostra enquesta. Valorem enormement la informació que ens ha aportat, i l'hi assegurem que les respostes aportades es mantindràn anònimes.</p>
            <p>Si tenen qualsevol comentari respecte a l'enquesta o la nostra investigació, si us plau posis en contacte amb en <a href="mailto:polricart@schoolhouse.io">Pol Ricart</a>.</p>
          </div>
        }

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
