import http from 'k6/http';
import k6example from 'https://raw.githubusercontent.com/loadimpact/k6/master/samples/thresholds_readme_example.js';
export default k6example; // use some predefined example to generate some data
export const options = { vus: 5, iterations: 10 };

// These are still very much WIP and untested, but you can use them as is or write your own!
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');

  // Send the results to some remote server or trigger a hook
  const resp = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(data));
  if (resp.status != 200) {
    console.error('Could not send summary, got status ' + resp.status);
  }

  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
    '../path/to/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
    'other/path/to/summary.json': JSON.stringify(data), // and a JSON with all the details...
    // And any other JS transformation of the data you can think of,
    // you can write your own JS helpers to transform the summary data however you like!
  };
}
