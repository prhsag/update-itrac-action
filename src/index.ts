/**
 * The entrypoint for the action.
 */
// import { run } from './main'

import * as core from '@actions/core'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
// run()

let data = JSON.stringify({
  fields: {
    project: {
      key: 'AIMT'
    },
    issuetype: {
      name: 'Ticket'
    }
  },
  update: {
    labels: [
      {
        add: 'triaged'
      },
      {
        add: 'REST'
      }
    ],
    summary: [
      {
        set: 'This ticket is updated and created using iTrac REST API'
      }
    ]
  }
})

let config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'https://itrac.eur.ad.sag/rest/api/2/issue/AIMT-319',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_KEY}`
  },
  data: data
}

axios
  .request(config)
  .then(response => {
    console.log(JSON.stringify(response.data))
  })
  .catch(error => {
    let e = error as Error
    console.log(e)
    core.setFailed(e.message)
  })
