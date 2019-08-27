import { connect } from 'react-redux';
import { createGame, fetchGame, updateGame } from '../actions/game_actions';
import Game from './game';

const mapStateToProps = (state) => {
  const currentGame = state.game || {};
  const currentPlayers = currentGame.current_players || ["", ""];
  const currentPlayer = currentGame.current_player || "unknown";
  const board = currentGame.board || [[" ", " ", " ", " ", " ", " ", " "],[" ", " ", " ", " ", " ", " ", " "],[" ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " "]]
  const status = currentGame.status || "making game";
  return ({
    currentPlayer: currentPlayer,
    board: board,
    status: status,
    currentPlayers: currentPlayers,
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
