import React from "react";

const InitialState = {
  query: "",
  tag: "",
  tag_id: "",
  totalPages: "",
  page: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SET_TAG":
      return {
        ...state,
        tag: action.payload,
      };
    case "SET_TAG_ID":
      return {
        ...state,
        tag_id: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = React.createContext({
  globalState: InitialState,
  globalDispatchActions: () => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [globalState, globalDispatch] = React.useReducer(reducer, InitialState);
  return (
    <GlobalContext.Provider value={{ globalState, globalDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
