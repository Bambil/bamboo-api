/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 02-06-2017
 * |
 * | File Name:     client.js
 * +===============================================
 */
const axios = require('axios');
const I1820Agent = require('./agent');


class I1820Client {
  constructor(url) {
    this.client = axios.create({
      baseURL: url,
      responseType: 'json'
    });
  }

  discovery(callback) {
    return new Promise((resolve, reject) => {
      this.client.get('/agent').then((response) => {
        const agents = [];
        for (const id in response.data) {
          agents.push(new I1820Agent(id,
            response.data[id].time,
            response.data[id].things));
        }
        if (callback) {
          callback(null, agents);
        }
        return resolve(agents);
      }).catch((err) => {
        if (callback) {
          callback(err);
        }
        return reject(err);
      });
    });
  }

  getLog(thing) {
    this.client.post('/thing', {
      type: thing.type,
      agent_id: thing.agent_id,
      device_id: thing.id,
      states: []
    });
  }

}

module.exports = I1820Client;
