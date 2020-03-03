// Action Types
const Actions = {
  UP: 'elevator/UP',
  DOWN: 'elevator/DOWN',
  OPEN: 'elevator/OPEN',
  ADD_UP: 'elevator/ADD_UP',
  ADD_DOWN: 'elevator/ADD_DOWN',
  REMOVE_UP: 'elevator/REMOVE_UP',
  REMOVE_DOWN: 'elevator/REMOVE_DOWN',
};

// State
interface Elevator {
  floor: number;
  moving: 'up' | 'down' | false;
  ups: [number, number][];
  downs: [number, number][];
}

export type State = Elevator;

const initialState: State = { floor: 0, moving: false, ups: [], downs: [] };

// Action Creators

export const up = () => ({ type: Actions.UP });
export const down = () => ({ type: Actions.DOWN });
export const open = () => ({ type: Actions.OPEN });
export const addUp = (from: number, to: number) => ({ type: Actions.ADD_UP, payload: [from, to] });
export const addDown = (from: number, to: number) => ({ type: Actions.ADD_DOWN, payload: [from, to] });
export const removeUp = (from: number, to: number) => ({ type: Actions.REMOVE_UP, payload: [from, to] });
export const removeDown = (from: number, to: number) => ({ type: Actions.REMOVE_DOWN, payload: [from, to] });

type ActionTypes = {
  type: string;
  payload: [number, number];
};

// Reducer
const reducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case Actions.UP:
      return {
        ...state,
        floor: state.floor + 1,
        moving: 'up',
      };
    case Actions.DOWN:
      return {
        ...state,
        floor: state.floor - 1,
        moving: 'down',
      };
    case Actions.OPEN:
      return {
        ...state,
        moving: false,
      };
    case Actions.ADD_UP:
      return {
        ...state,
        ups: [...state.ups, action.payload]
      };
    case Actions.ADD_DOWN:
      return {
        ...state,
        downs: [...state.downs, action.payload]
      };
    case Actions.REMOVE_UP:
      const newUps = state.ups.filter(up => up[0] !== action.payload[0] && up[1] !== action.payload[1]);
      return {
        ...state,
        ups: newUps
      };
    case Actions.REMOVE_DOWN:
      const newDowns = state.downs.filter(down => down[0] !== action.payload[0] && down[1] !== action.payload[1]);
      return {
        ...state,
        downs: newDowns
      };
    default:
      return state;
  }
};

export default reducer;