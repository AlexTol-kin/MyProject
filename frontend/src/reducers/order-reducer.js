import { ACTION_TYPE } from "../actions";

const initialUserState = {
  id: null,
  buyer: null,
  price: null,
  order: [],
};

export const orderReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_ORDER:
      return { ...state, ...action.payload };

    case ACTION_TYPE.ADD_ORDER:
      return { ...state, ...action.payload };

    case ACTION_TYPE.REMOVE_ORDER:
      return initialUserState;

    default:
      return state;
  }
};
