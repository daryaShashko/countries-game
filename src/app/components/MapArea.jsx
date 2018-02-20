import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {YMaps, Map, Placemark, GeoObject} from 'react-yandex-maps';

class MapArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState: {
        center: [55.76, 37.64],
        zoom: 1,
        controls: [],
        begaviors: []
      }
    };
  }

  render() {
    const {location} = this.props;
    return (
      <div className="map-area">
        <YMaps>
          <Map classNam='asd' state={this.state.initialState} width={1000} height={640}>
            {
                this.props.location.map((el, i) =>
                  <Placemark key={i}
                             geometry={{
                               coordinates: el
                             }}
                             properties={{
                               hintContent: 'Собственный значок метки',
                               balloonContent: 'Это красивая метка'
                             }}
                  />
                )
            }
          </Map>
        </YMaps>
      </div>
    )
  }
}


export default connect(
  state => ({ // mapStateToProps
    listOfCountries: state.listOfCountries[0],
    computerCountries: state.computerCountries,
    userCountries: state.userCountries,
    gameData: state.gameData,
    location: state.location
  }),
  dispatch => ({})
)(MapArea);