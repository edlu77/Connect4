import * as PlayerApiUtil from '../util/player_api_util';
export const RECEIVE_PLAYER = 'RECEIVE_PLAYER';

const receivePlayer = (player) => {
  return ({
    type: RECEIVE_PLAYER,
    player: player,
  })
};

export const createPlayer = (player) => dispatch => {
  return PlayerApiUtil.createPlayer(player).then(
    (player) => dispatch(receivePlayer(player))
  )
};
