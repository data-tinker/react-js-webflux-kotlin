import { createContext, useContext, useReducer } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use jwt-decode instead of jwt
import http from './http'; // Import your http utility here

const initialState = {
  token: null,
  signInError: false,
  signInErrorMsg: ''
};

// Actions
const SET_TOKEN = 'SET_TOKEN';
const SET_SIGN_IN_ERROR = 'SET_SIGN_IN_ERROR';
const SET_SIGN_IN_ERROR_MSG = 'SET_SIGN_IN_ERROR_MSG';

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {...state, token: action.payload};
    case SET_SIGN_IN_ERROR:
      return {...state, signInError: action.payload};
    case SET_SIGN_IN_ERROR_MSG:
      return {...state, signInErrorMsg: action.payload};
    default:
      return state;
  }
};

// AuthContext
export const AuthContext = createContext();

// Context Provider
export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // signIn action
  const signIn = async ({username, password}) => {
    try {
      console.log(username, password);
      const response = await http.post('http://localhost:8087/login', {username, password});
      console.log(response);
      const token = response.headers.get('authorization');
      console.log(token);
      dispatch({type: SET_TOKEN, payload: token});
      dispatch({type: SET_SIGN_IN_ERROR, payload: false});
      dispatch({type: SET_SIGN_IN_ERROR_MSG, payload: ''});
      sessionStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
      dispatch({type: SET_TOKEN, payload: null});
      dispatch({type: SET_SIGN_IN_ERROR, payload: true});
      dispatch({type: SET_SIGN_IN_ERROR_MSG, payload: error});
      sessionStorage.removeItem('token');
    }
  };

  // signOut action
  const signOut = () => {
    dispatch({type: SET_TOKEN, payload: null});
    sessionStorage.removeItem('token');
  };

  // isAuthenticated getter
  const isAuthenticated = () => {
    const token = state.token;
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token.replace('Bearer ', ''));
    const expDate = new Date(decoded.exp * 1000);
    return expDate > new Date();
  };

  // Values to pass to provider
  const authContextValue = {
    state,
    signIn,
    signOut,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
