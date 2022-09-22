import * as React from "react";
import { createContext, useContext, useReducer } from "react";

type AppState = typeof initialState;
type Action =
   | { type: "SET_DIRECTIONS_RESPONSE"; payload: any }
   | { type: "SET_DISTANCE"; payload: any }
   | { type: "SET_DURATION"; payload: any }
   | { type: "SET_RIDE"; payload: any }
   | { type: "SET_CURRENT_ADDRESS"; payload: any };

interface AppProviderProps {
   children: React.ReactNode;
}

const initialState = {
   directionsResult: null,
   distance: null,
   duration: null,
   ride: "",
   currentAddress: ""
};

export const AppContext = createContext<{
   state: AppState;
   dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

const reducer = (state: AppState, action: Action) => {
   switch (action.type) {
      case "SET_DIRECTIONS_RESPONSE": {
         return {
            ...state,
            directionsResult: action.payload,
         };
      }
      case "SET_DISTANCE": {
         return {
            ...state,
            distance: action.payload,
         };
      }
      case "SET_DURATION": {
         return {
            ...state,
            duration: action.payload,
         };
      }
      case "SET_RIDE": {
         return {
            ...state,
            ride: action.payload,
         };
      }
      case "SET_CURRENT_ADDRESS": {
         return {
            ...state,
            currentAddress: action.payload,
         };
      }
      default:
         return state;
   }
};

export const AppProvider = ({ children }: AppProviderProps) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   return (
      <AppContext.Provider value={{ state, dispatch }}>
         {children}
      </AppContext.Provider>
   );
};
