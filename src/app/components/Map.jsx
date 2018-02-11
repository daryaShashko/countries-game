import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    var myMap;

// Дождёмся загрузки API и готовности DOM.
    ymaps.ready(init);

    function init () {
      // Создание экземпляра карты и его привязка к контейнеру с
      // заданным id ("map").
      myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center:[53.910086, 50.313935],
        zoom: 2
      });


    }

  }

  render() {
    return (
      <div id='map' className="map-area"></div>
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
  })
)(Map);