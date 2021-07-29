import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import { TGlobalContextProviderProps, TGlobalStateContext } from './types';
import { initialState, reducer } from './reducer';

// Global state context
const Context = createContext<Partial<TGlobalStateContext>>([]);

// Named 'useContext' helper function
export const useGlobalContext = () => useContext(Context) as TGlobalStateContext;

// Context provider component
export const GlobalContextProvider = ({ children }: TGlobalContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node,
};
