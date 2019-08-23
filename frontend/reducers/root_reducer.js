import { combineReducers } from 'redux';
import playersReducer from './players_reducer';
import gameReducer from './game_reducer';

const rootReducer = combineReducers({
  players: playersReducer,
  game: gameReducer,
});

export default rootReducer;
