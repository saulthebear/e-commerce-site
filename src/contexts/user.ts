import { createContext } from 'react';
import IUser, { DEFAULT_FIRE_TOKEN, DEFAULT_USER } from '../interfaces/user';

export interface IUserState {
  user: IUser;
  fire_token: string;
}

export interface IUserActions {
  type: 'LOGIN' | 'LOGOUT' | 'SET_CART';
  payload: IUserState;
}

export const initialUserState: IUserState = {
  user: DEFAULT_USER,
  fire_token: DEFAULT_FIRE_TOKEN,
};

export const userReducer = (state: IUserState, action: IUserActions) => {
  const user = action.payload.user;
  const fire_token = action.payload.fire_token;

  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('fire_token', fire_token);
      return { user, fire_token };
    case 'LOGOUT':
      localStorage.removeItem('fire_token');
      return initialUserState;
    case 'SET_CART':
      return {
        ...state,
        user: { ...state.user, cart: action.payload.user.cart },
      };
    default:
      return state;
  }
};

export interface IUserContextProps {
  userState: IUserState;
  userDispatch: React.Dispatch<IUserActions>;
}

const UserContext = createContext<IUserContextProps>({
  userState: initialUserState,
  userDispatch: () => null,
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;
export default UserContext;
