import { createStore, combineReducers } from 'redux';

import elevatorReducer from './ducks/elevator';
import buildingReducer from './ducks/building';
import humansReducer from './ducks/humans';

const rootReducer = combineReducers({
  elevator: elevatorReducer,
  building: buildingReducer,
  humans: humansReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;