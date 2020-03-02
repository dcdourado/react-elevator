// Action Types
const Actions = {
  HEIGHT: 'building/HEIGHT',
  SPEED: 'building/SPEED',
};

// State
interface Building {
  height: number;
  speed: number;
}

export type State = Building;

const initialState: State = { height: 5, speed: 5000 };

// Action Creators

export const setHeight = (height: number) => ({ type: Actions.HEIGHT, payload: height });
export const setSpeed = (speed: number) => ({ type: Actions.SPEED, payload: speed });

type ActionTypes = {
  type: string;
  payload: number;
};

// Reducer
const reducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case Actions.HEIGHT:
      return {
        ...state,
        height: action.payload,
      };
    case Actions.SPEED:
      return {
        ...state,
        speed: action.payload,
      }
    default:
      return state;
  }
};

export default reducer;