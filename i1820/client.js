/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 02-06-2017
 * |
 * | File Name:     client.js
 * +===============================================
 */
const axios = require('axios')

const I1820Agent = require('./agent')
const I1820Thing = require('./thing')

class I1820Client {
  constructor (url, socket) {
    this.client = axios.create({
      baseURL: url,
      responseType: 'json'
    })

    if (socket) {
      this.socket = require('socket.io-client')(url)
    }
  }

  discovery (callback) {
    return new Promise((resolve, reject) => {
      this.client.get('/agent').then((response) => {
        const agents = []
        for (const id in response.data) {
          const things = []
          response.data[id].things.forEach((thing) => {
            things.push(new I1820Thing(this.client,
              thing.id, id, thing.type))
          })

          agents.push(new I1820Agent(id,
            response.data[id].time,
            things))
        }
        if (callback) {
          callback(null, agents)
        }
        return resolve(agents)
      }).catch((err) => {
        if (callback) {
          callback(err)
        }
        return reject(err)
      })
    })
  }
}

module.exports = I1820Client
