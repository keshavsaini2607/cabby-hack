import * as React from "react";
import { createContext, useContext, useReducer } from "react";

type AppState = {
   directionsResult: any;
   distance: any;
   duration: any;
   ride: any;
   currentAddress: string;
   currentIP: string;
   rides: any[];
   showRides: Boolean;
}
type Action =
   | { type: "SET_DIRECTIONS_RESPONSE"; payload: any }
   | { type: "SET_DISTANCE"; payload: any }
   | { type: "SET_DURATION"; payload: any }
   | { type: "SET_RIDE"; payload: any }
   | { type: "SET_CURRENT_ADDRESS"; payload: any }
   | { type: "SET_CURRENT_IP"; payload: any }
   | { type: "SET_RIDES"; payload: any }
   | { type: "SET_SHOW_RIDES"; payload: Boolean }

interface AppProviderProps {
   children: React.ReactNode;
}

const initialState = {
   directionsResult: null,
   distance: null,
   duration: null,
   ride: null,
   currentAddress: "",
   currentIP: "",
   rides: [],
   showRides: false,
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
      case "SET_CURRENT_IP": {
         return {
            ...state,
            currentIP: action.payload,
         };
      }
      case "SET_RIDES": {
         return {
            ...state,
            rides: [...state.rides, action.payload],
         };
      }
      case "SET_SHOW_RIDES": {
         return {
            ...state,
            showRides: action.payload,
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
