import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch'
import {connect} from 'react-redux';


import FieldInput from './components/FieldInput.jsx';
import MapArea from './components/MapArea.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(json => json.map(country => country.name.toLowerCase()))
      .then(countryNames =>
        this.props.onLoadCountries(countryNames)
      )
  }

  render() {
    return (
      <div>
        <FieldInput/>
        <div className="board__container">
          <div className="board bord_computer">
            <ul className="bord__list">
              {this.props.computerCountries.map(
                (x, i) => <li key={i}>{x}</li>
              )}
            </ul>
          </div>
          <div className="board bord_user">
            <ul className="bord__list">
              {this.props.userCountries.map(
                (x, i) => <li key={i}>{x}</li>
              )}
            </ul>
          </div>
        </div>

        <MapArea/>
      </div>
    )
  }
}


export default connect(
  state => ({ // mapStateToProps
    listOfCountries: state.listOfCountries,
    userCountries: state.userCountries,
    computerCountries: state.computerCountries
  }),
  dispatch => ({
    onLoadCountries: (arrCountries) => {
      dispatch({type: 'ADD_COUNTRIES_LIST', countriesList: arrCountries})
    }
  })
)(App);