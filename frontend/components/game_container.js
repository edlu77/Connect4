import { connect } from 'react-redux';
import { createGame, fetchGame, updateGame } from '../actions/game_actions';
import Game from './game';

const mapStateToProps = (state) => {
  const currentGame = state.game || {};
  const board = currentGame.board || [[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
  return ({
    currentGame: currentGame,
    board: board,
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    createGame: (info) => dispatch(createGame(info)),
    fetchGame: (game) => dispatch(fetchGame(game)),
    updateGame: (info) => dispatch(updateGame(info)),
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
