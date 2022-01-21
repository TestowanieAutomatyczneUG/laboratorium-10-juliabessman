import { combineReducers } from 'redux';
import charactersReducer from './characters/reducers.js';
import deathsReducer from './deaths/reducers.js';
import episodesReducer from './episodes/reducers.js';
import quotesReducer from './quotes/reducers.js';

export default combineReducers({
  characters: charactersReducer,
  deaths: deathsReducer,
  episodes: episodesReducer,
  quotes: quotesReducer,
});
