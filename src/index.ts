/**
 * The entrypoint for the action.
 */
// import { run } from './main'

import * as core from '@actions/core'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
// run()

const data = JSON.stringify({
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

const config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'https://itrac.eur.ad.sag/rest/api/2/issue/AIMT-319',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_KEY}`
  },
  data
}

console.log('ITRAC_API_KEY', process.env.API_KEY)

const updateITracIssue = async (): Promise<void> => {
  try {
    const response = await axios.request(config)
    console.log(
      '🚀 ~ file: index.ts:52 ~ updateITracIssue ~ response:',
      response.data
    )
  } catch (error) {
    const e = error as Error
    // console.log(e)
    core.setFailed(e.message)
  }
}

updateITracIssue()
