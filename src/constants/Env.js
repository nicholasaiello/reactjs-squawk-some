import * as env from '../.env.local.json';

export const ENV = env.ENV;
export const BASE_API_URL = env.BASE_API_URL; // "https://nodejs-squawk-some.herokuapp.com";
export const DEFAULT_SYNC_INTERVAL = env.DEFAULT_SYNC_INTERVAL || (60000 * 2);
