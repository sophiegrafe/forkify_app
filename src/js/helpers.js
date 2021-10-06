import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

export function timeout(s) {
  return new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(new Error(`Request took too long! Timeout after ${s} second`)),
      s * 1000
    )
  );
}

export async function getJSON(url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    // rethrowing the error in the catch block so we propagate it from one async function to an other asyn fct
    throw err;
  }
}
