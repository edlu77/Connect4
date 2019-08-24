import { connect } from 'react-redux';
import { createGame, fetchGame } from '../actions/game_actions';
import Game from './game';

const mapStateToProps = (state) => {
  const currentGame = state.game || {};
  return ({
    currentGame: currentGame,
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    createGame: (game) => dispatch(createGame(game)),
    fetchGame: (game) => dispatch(fetchGame(game))
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
