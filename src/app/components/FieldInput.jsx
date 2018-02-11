import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


class FieldInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerVoice = this.clickHandlerVoice.bind(this);

  }

  clickHandler() {
    this.props.onAddUserCountry(this.textInput.value);
    this.props.onChangeCurrentValue(this.textInput.value.toLowerCase());
    this.textInput.value = '';
  }

  clickHandlerVoice() {
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    const self = this;

    const countries = this.props.listOfCountries;
    const grammar = '#JSGF V1.0; grammar countries; public <country> = ' + countries.join(' | ') + ' ;';

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    var diagnostic = document.querySelector('#app');


    document.body.onclick = function () {
      recognition.start();
      console.log('Ready to receive a color command.');
    }

    recognition.onresult = function (event) {
      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The [last] returns the SpeechRecognitionResult at the last position.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object

      var last = event.results.length - 1;
      var country = event.results[last][0].transcript;

      self.props.onAddUserCountry(country);
      self.props.onChangeCurrentValue(country);

      console.log('Confidence: ' + event.results[0][0].confidence, country);
    }

    recognition.onspeechend = function () {
      recognition.stop();
    }

    recognition.onnomatch = function (event) {
      diagnostic.textContent = "I didn't recognise that country.";
    }

    recognition.onerror = function (event) {
      diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
    }
  }


  componentDidUpdate() {

    const lastCharacter = this.props.gameData.currentValue.slice(-1);
    const listOfCountries = this.props.listOfCountries;
    let computerCountry;

    console.log(listOfCountries);
    console.log(this.props.gameData.userTurn);

    if (!this.props.gameData.userTurn) {
      for (var i = 0; i < listOfCountries.length; i++) {
        if (listOfCountries[i].startsWith(lastCharacter)) {
          computerCountry = listOfCountries[i];
          break;
        }
      }

      this.props.onAddComputerCountry(computerCountry);
      this.props.onChangeCurrentValue(computerCountry);

    } else if (this.props.gameData.userTurn) {
      console.log('please, enter the country');
    }

  }

  render() {
    return (
      <div className="form-area">
        <label className="form-area__label" htmlFor="userCountry">Please, enter your country here</label>
        <input className="form-area__input" id='userCountry' type="text" ref={(input) => {
          this.textInput = input;
        }}/>
        <button className="button" onClick={this.clickHandler}>Go</button>
        <button className="button" onClick={this.clickHandlerVoice}>Go by voice</button>

      </div>
    )
  }
}


export default connect(
  state => ({ // mapStateToProps
    listOfCountries: state.listOfCountries[0],
    computerCountries: state.computerCountries,
    userCountries: state.userCountries,
    gameData: state.gameData
  }),
  dispatch => ({
    onAddUserCountry: (countryName) => {
      dispatch({type: 'UPDATE_WHOSE_TURN'});
      dispatch({type: 'ADD_USER_COUNTRY', country: countryName.toLowerCase()});
      dispatch({type: 'REMOVE_COUNTRY_FROM_LIST', countriesList: countryName.toLowerCase()});
    },
    onChangeCurrentValue: (value) => {
      dispatch({type: 'CHANGE_CURRENT_VALUE', currentValue: value});
    },
    onAddComputerCountry: (countryNameS) => {
      dispatch({type: 'UPDATE_WHOSE_TURN'});
      dispatch({type: 'ADD_COMPUTER_COUNTRY', country: countryNameS});
      dispatch({type: 'REMOVE_COUNTRY_FROM_LIST', countriesList: countryNameS});
    }
  })
)(FieldInput);