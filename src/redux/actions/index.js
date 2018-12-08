import { CHANGE_CEP } from "./types";

// Action to Change CEP on Redux
export const changeCEP = cep => ({
  type: CHANGE_CEP,
  payload: {
    cep
  }
});
