import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


class BoardOfResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div className="board__container">
                <div className="board bord_computer">
                    <h2 className="board__title">Computer list of countries</h2>
                    <ul className="board__list">
                        {this.props.computerCountries.map(
                            (x, i) => <li className="board__list-item" key={i}>{x}</li>
                        )}
                    </ul>
                </div>
                <div className="board bord_user">
                    <h2 className="board__title">User list of countries</h2>
                    <ul className="board__list">
                        {this.props.userCountries.map(
                            (x, i) => <li className="board__list-item" key={i}>{x}</li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({ // mapStateToProps
        computerCountries: state.computerCountries,
        userCountries: state.userCountries
    }),
    dispatch => ({})
)(BoardOfResults);