import * as GameApiUtil from '../util/game_api_util';
export const RECEIVE_GAME = 'RECEIVE_GAME';

const receiveGame = (game) => {
  return ({
    type: RECEIVE_GAME,
    game: game,
  })
};

export const createGame = (info) => dispatch => {
  return GameApiUtil.createGame(info).then(
    (game) => dispatch(receiveGame(game))
  )
};

export const fetchGame = (game) => dispatch => {
  return GameApiUtil.fetchGame(game).then(
    (game) => dispatch(receiveGame(game))
  )
};

export const updateGame = (info) => dispatch => {
  return GameApiUtil.updateGame(info).then(
    (game) => dispatch(receiveGame(game))
  )
};

export const deleteGame = (game) => dispatch => {
  return GameApiUtil.deleteGame(game)
};
