/**
 * Configure a simple instance of axios
 */

import axios from "axios";

const instance = axios.create({
  timeout: 10000
});

Object.freeze(instance);

export default instance;
