import { RECEIVE_GAME } from '../actions/game_actions';
import merge from 'lodash/merge';

const gameReducer = (oldState = {}, action) => {

  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_GAME:
      return action.game;
    default:
      return oldState;
  };
};

export default gameReducer;
