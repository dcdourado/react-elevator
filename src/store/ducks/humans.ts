// Action Types
const Actions = {
  ADD_WAITING: 'humans/ADD_WAITING',
  REMOVE_WAITING: 'humans/REMOVE_WAITING',
  ADD_ACTIVE: 'humans/ADD_ACTIVE',
  REMOVE_ACTIVE: 'humans/REMOVE_ACTIVE',
};

// State
interface Humans {
  id: number;
  waiting: {id: number, floor: number}[];
  active: {id: number, floor: number}[];
}

export type State = Humans;

const initialState: State = { id: 0, waiting: [], active: [] };

// Action Creators

export const addWaiting = (id: number, floor: number) => ({ type: Actions.ADD_WAITING, payload: { id, floor } });
export const removeWaiting = (id: number) => ({ type: Actions.REMOVE_WAITING, payload: { id } });
export const addActive = (id: number, floor: number) => ({ type: Actions.ADD_ACTIVE, payload: { id, floor } });
export const removeActive = (id: number) => ({ type: Actions.REMOVE_ACTIVE, payload: { id } });

type ActionTypes = {
  type: string;
  payload: { id: number, floor: number };
};

// Reducer
const reducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case Actions.ADD_WAITING:
      return {
        ...state,
        id: state.id === 16 ? 0 : state.id + 1,
        waiting: [...state.waiting, action.payload],
      };
    case Actions.REMOVE_WAITING:
      const newWaiting = state.waiting.filter(human => human.id !== action.payload.id);
      return {
        ...state,
        waiting: newWaiting,
      };
    case Actions.ADD_ACTIVE:
      return {
        ...state,
        active: [...state.active, action.payload],
      };
    case Actions.REMOVE_ACTIVE:
      const newActive = state.active.filter(human => human.id !== action.payload.id);
      return {
        ...state,
        active: newActive,
      };
    default:
      return state;
  }
};

export default reducer;