import * as core from '@actions/core'
import { wait } from './wait'
import axios from 'axios'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
/* export async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Waiting ${ms} milliseconds ...`)

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
} */


let data = JSON.stringify({
  "fields": {
    "project": {
      "key": "AIMT"
    },
    "issuetype": {
      "name": "Ticket"
    }
  },
  "update": {
    "labels": [
      {
        "add": "triaged"
      },
      {
        "add": "REST"
      }
    ],
    "summary": [
      {
        "set": "This ticket is updated and created using iTrac REST API"
      }
    ]
  }
});

let config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'https://itrac.eur.ad.sag/rest/api/2/issue/AIMT-319',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer MTkyNzgzMDI2MTgxOiiSNv4rS88DmyDYX/70gi45AZvC'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


