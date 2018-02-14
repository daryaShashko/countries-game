import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


class BoardOfResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(){
    const boardResultContainer = window.document.querySelector('.board__results-container');
    (this.props.gameData.stopGame) ? boardResultContainer.classList.add('board__results-container_visible') : false
  }

  render() {
    return (
      <div className="board__container">

        <div className="board board__common">
          {
          (this.props.gameData.listOfDeletedCountries.length === 0) ?  <h2 className="board__title">User you start</h2> : <h2 className="board__title">List of countries</h2>
        }
          <ul className="board__list">
            {this.props.gameData.listOfDeletedCountries.map(
              (x, i) => <li className="board__list-item" key={i}>{x}</li>
            )}
          </ul>

        </div>


        <div className="board__results-container">

          <div className="board bord_computer">
            <h2 className="board__title">Computer list of countries</h2>
            <ul className="board__list">
              {this.props.computerCountries.map(
                (x, i) => <li className="board__list-item" key={i}>{x}</li>
              )}
            </ul>
            <h2 className="borad__result">Computer points: {this.props.computerCountries.length * 10}</h2>

          </div>


          <div className="board bord_user">
            <h2 className="board__title">User list of countries</h2>
            <ul className="board__list">
              {this.props.userCountries.map(
                (x, i) => <li className="board__list-item" key={i}>{x}</li>
              )}
            </ul>
            <h2 className="borad__result">User points: {this.props.userCountries.length * 10}</h2>
          </div>


          <h2 className="borad__result">
            Winner is {
            (this.props.userCountries.length !== this.props.computerCountries.length) ?
              ((this.props.userCountries.length > this.props.computerCountries.length) ? <span>User</span>: <span>Computer</span>) :
              ((this.props.gameData.userTurn) ? <span>Computer</span> : <span>User</span>)
          }
          </h2>
        </div>

      </div>
    )
  }
}


export default connect(
  state => ({ // mapStateToProps
    computerCountries: state.computerCountries,
    userCountries: state.userCountries,
    gameData: state.gameData
  }),
  dispatch => ({})
)(BoardOfResults);