import axios from 'axios';

import {F1Api} from '../constantы/url';

export const api = axios.create({
  baseURL: F1Api,
});
