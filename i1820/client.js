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
const I1820Thing = require('./thing');


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

          const things = [];
          response.data[id].things.forEach((thing) => {
            things.push(new I1820Thing(thing.id, id, thing.type));
          });

          agents.push(new I1820Agent(id,
            response.data[id].time,
            things));
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

  getLog(thing, callback) {
    return new Promise((resolve, reject) => {
      this.client.post('/thing', {
        'type': thing.type,
        'agent_id': thing.agentId,
        'device_id': thing.id,
        'states': []
      }).then((response) => {
        const result = response.data;
        if (callback) {
          callback(null, result);
        }
        return resolve(result);
      }).catch((err) => {
        if (callback) {
          callback(err);
        }
        return reject(err);
      });
    });
  }

  setConfiguration(thing, configuration, callback) {
    return new Promise((resolve, reject) => {
      this.client.put('/thing', {
        'type': thing.type,
        'agent_id': thing.agentId,
        'device_id': thing.id,
        'settings': configuration
      }).then(() => {
        if (callback) {
          callback(null);
        }
        return resolve();
      }).catch((err) => {
        if (callback) {
          callback(err);
        }
        return reject(err);
      });
    });
  }

}

module.exports = I1820Client;
