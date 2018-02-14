import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import fetch from "isomorphic-fetch";


class FieldInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerVoice = this.clickHandlerVoice.bind(this);
  }

  clickHandler(e) {
    this.changeCountry(this.textInput.value);
  }

  clickHandlerVoice(e) {

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

    const diagnosticContainer = document.querySelector('.form-area__voice-result');
    const diagnosticText = document.querySelector('.form-area__voice-result-text');

    recognition.start();
    diagnosticText.textContent = 'Ready to receive your country.';
    diagnosticContainer.classList.add('form-area__voice-result_visible');

    recognition.onresult = function (event) {
      var last = event.results.length - 1;
      var voiceCountry = event.results[last][0].transcript;


      diagnosticText.textContent = `Did you say ${voiceCountry}?`;

      self.buttonCounfirm.onclick = function () {
        self.changeCountry(voiceCountry);
        diagnosticContainer.classList.remove('form-area__voice-result_visible');
      };

      self.buttonReject.onclick = function () {
        recognition.start();
        diagnosticText.textContent = 'Ready to receive your country.';
      }

    }

    recognition.onspeechend = function () {
      recognition.stop();
    }

    recognition.onnomatch = function (event) {
      diagnosticText.textContent = "I didn't recognise that country.";
    }

    recognition.onerror = function (event) {
      diagnosticText.textContent = 'Error occurred in recognition: ' + event.error;
    }

  }


  componentDidUpdate() {

    const lastCharacter = this.props.gameData.currentValue.slice(-1);
    const listOfCountries = this.props.listOfCountries;
    let computerCountry;

    if (!this.props.gameData.userTurn) {
      for (let i = 0; i < listOfCountries.length; i++) {
        if (listOfCountries[i].startsWith(lastCharacter)) {
          computerCountry = listOfCountries[i];
          break;
        }
      }

      fetch(`https://restcountries.eu/rest/v2/name/${computerCountry}`)
        .then(response => response.json())
        .then(json => json[0].latlng)
        .then(location =>
          this.props.onAddLocation(location)
        )
    } else if (this.props.gameData.userTurn) {
      console.log('please, enter the country');
    }
  }

  changeCountry(newCountry) {
    const inputValue = newCountry.toLowerCase();

    const firstChar = inputValue.charAt(0);
    const lastChar = this.props.gameData.currentValue.slice(-1);

    const listOfCountries = this.props.listOfCountries;
    const self = this;


    function isEqual(el) {
      return el === inputValue;
    }


    (listOfCountries.some(isEqual)) ? validation() : wrongAnswer();


    function validation() {
      if (self.props.userCountries.length > 0 && firstChar === lastChar) {
        addUserCountry();
      } else if (self.props.userCountries.length === 0) {
        addUserCountry();
      } else {
        wrongAnswer();
      }
    }

    function wrongAnswer() {
      alert('введи правильно');
      self.textInput.value = '';
    }

    function addUserCountry() {
      self.props.onAddUserCountry(inputValue);
      self.props.onChangeCurrentValue(inputValue);
      fetch(`https://restcountries.eu/rest/v2/name/${inputValue}`)
        .then(response => response.json())
        .then(json => json[0].latlng)
        .then(location =>
          self.props.onAddLocation(location)
        );
      self.textInput.value = '';
    }
  }


  render() {
    return (
      <div className="form-area">
        <label className="form-area__label" htmlFor="userCountry">Please, enter your country here</label>
        <button className="button button_red" onClick={this.props.onClickStopTheGame} ref={(button) => this.stopButton = button}>Stop the game</button>
        <div className="flex-container --center --middle">

        <input className="form-area__input" id='userCountry' type="text" ref={(input) => {
          this.textInput = input;
        }}/>
        <div className="form-area__controlls">
          <button className="button" onClick={this.clickHandler} ref={(button) => this.textButton = button}>Enter</button>
          <button className="button" onClick={this.clickHandlerVoice} ref={(button) => this.voiceButton = button}>Enter by
            voice
          </button>
        </div>
        </div>

        <div className="form-area__voice-result">
          <p className="form-area__voice-result-text"></p>
          <button className="button button_green" ref={(button) => this.buttonCounfirm = button}>Confirm voice
            record
          </button>
          <button className="button button_orange" ref={(button) => this.buttonReject = button}>Try again</button>
        </div>
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
      dispatch({type: 'ADD_USER_COUNTRY', country: countryName.toLowerCase()});
      dispatch({type: 'REMOVE_COUNTRY_FROM_LIST', countriesList: countryName.toLowerCase()});
      dispatch({type: 'UPDATE_WHOSE_TURN'});
    },
    onChangeCurrentValue: (value) => {
      dispatch({type: 'CHANGE_CURRENT_VALUE', currentValue: value});
    },

    onAddLocation: (value) => {
      dispatch({type: 'ADD_LOCATION', location: value});
    },
    onAddComputerCountry: (countryNameS) => {
      dispatch({type: 'ADD_COMPUTER_COUNTRY', country: countryNameS});
      dispatch({type: 'REMOVE_COUNTRY_FROM_LIST', countriesList: countryNameS});
      dispatch({type: 'UPDATE_WHOSE_TURN'});
    },
    onClickStopTheGame: () => {
      dispatch({ type: 'STOP_THE_GAME' })
    }
  })
)(FieldInput);
