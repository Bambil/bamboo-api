/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 19-06-2017
 * |
 * | File Name:     thing.js
 * +===============================================
 */


class I1820Thing {
  constructor(client, id, agentId, type) {
    this.client = client;
    this.id = id;
    this.agentId = agentId;
    this.type = type;
  }

  get log() {
    return new Promise((resolve, reject) => {
      this.client.post('/thing', {
        'type': this.type,
        'agent_id': this.agentId,
        'device_id': this.id,
        'states': []
      }).then((response) => {
        const result = response.data;
        return resolve(result);
      }).catch((err) => reject(err));
    });
  }
}

module.exports = I1820Thing;
