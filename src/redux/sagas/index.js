/**
 * Configure CEP Saga (or rootSaga for bigger applications)
 */

// Importing effects
import { call, select, put, takeEvery } from "redux-saga/effects";

// Importing actions
import {
  CHANGE_ADDRESS,
  RESET_ADDRESS,
  SEARCH_ADDRESS
} from "../actions/types";

// Importing HTTP/Axios instance
import http from "../../services/http";

// Export default Saga (Listening from actions for other sagas)
export default function* mySaga() {
  yield takeEvery(SEARCH_ADDRESS, getAddressCEP);
}

/**
 * Get AddressCEP Saga
 */
export function* getAddressCEP() {
  // Get CEP from Redux State
  const cep = yield select(state => state.cep);

  try {
    // Call request
    const response = yield call(
      http.get,
      `https://viacep.com.br/ws/${cep.replace(/[^\d]+/g, "")}/json/`
    );

    // Check by errors (this API don't return http error)
    if (response.data.erro) {
      throw new Error("Invalid CEP")
    }

    // Dispatch result for change address
    yield put({
      type: CHANGE_ADDRESS,
      payload: {
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        localidade: response.data.localidade,
        uf: response.data.uf,
        ibge: response.data.ibge
      }
    });
  } catch (error) {
    // Dispatch error and reset address
    yield put({
      type: RESET_ADDRESS
    });
  }
}
