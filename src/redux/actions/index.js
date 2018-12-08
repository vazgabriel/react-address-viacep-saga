import { CHANGE_CEP, SEARCH_ADDRESS } from "./types";

// Action to Change CEP on Redux
export const changeCEP = cep => ({
  type: CHANGE_CEP,
  payload: {
    cep
  }
});

// Action to Search Address
export const searchAddress = () => ({
  type: SEARCH_ADDRESS
});
