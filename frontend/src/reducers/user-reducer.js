import { ACTION_TYPE } from "../actions";
import { ROLE } from "../constans/role";

const initialUserState = {
  id: null,
  login: null,
  roleId: ROLE.GUEST,
  session: null,
  cart: [],
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      return { ...state, ...action.payload };

    case ACTION_TYPE.LOGOUT:
      return initialUserState;

    case ACTION_TYPE.ADD_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case ACTION_TYPE.ADD_QUANTITY:
      return {
        ...state,
        cart: [
          ...state.cart.filter((cart) => cart.id !== action.payload.id),
          action.payload.quantity,
        ],
      };
    case ACTION_TYPE.REMOVE_CART:
      return {
        ...state,
        cart: state.cart.filter((cart) => cart.id !== action.payload.id),
      };
    case ACTION_TYPE.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
