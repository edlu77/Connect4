import { connect } from 'react-redux';
import { createGame } from '../actions/game_actions';
import Game from './game';

const mapStateToProps = (state) => {
  return ({
    name: "",
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    createGame: (game) => dispatch(createGame(game)),
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
