import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch'
import {connect} from 'react-redux';


import FieldInput from './components/FieldInput.jsx';
import MapArea from './components/MapArea.jsx';
import BoardOfResults from './components/BoardOfResults.jsx';


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
       <BoardOfResults />
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