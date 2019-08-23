import { RECEIVE_PLAYER } from '../actions/player_actions';
import merge from 'lodash/merge';

const playersReducer = (oldState = {}, action) => {

  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_PLAYER:
      return action.player;
    default:
      return oldState;
  };
};

export default playersReducer;
