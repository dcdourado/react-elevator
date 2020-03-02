// Action Types
const Actions = {
  HEIGHT: 'building/HEIGHT',
};

// State
interface Building {
  height: number;
}

export type State = Building;

const initialState: State = { height: 5 };

// Action Creators

export const setHeight = (height: number) => ({ type: Actions.HEIGHT, payload: height });

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
    default:
      return state;
  }
};

export default reducer;