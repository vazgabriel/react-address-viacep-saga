/**
 * Configure CEP Reducer (or rootReducer with combineReducers)
 */

// Importing Types
import { CHANGE_CEP, CHANGE_ADDRESS, RESET_ADDRESS } from "../actions/types";

// Initial State
const INITIAL_STATE = {
  cep: "",
  logradouro: "",
  bairro: "",
  localidade: "",
  uf: "",
  ibge: ""
};

// Export actions functions
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_CEP:
      return { ...state, cep: action.payload.cep || "" };
    case CHANGE_ADDRESS:
      return { ...state, ...action.payload };
    case RESET_ADDRESS:
      return { ...INITIAL_STATE, cep: state.cep };
    default:
      return state;
  }
};
