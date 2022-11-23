import axios from 'axios';

import {F1Api} from '../constants/url';

export const api = axios.create({
  baseURL: F1Api,
});
