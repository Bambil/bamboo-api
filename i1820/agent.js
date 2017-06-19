/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 19-06-2017
 * |
 * | File Name:     agent.js
 * +===============================================
 */


class I1820Agent {
  constructor(id, timestamp, things) {
    this.id = id;
    this.timestamp = new Date(timestamp);
    this.things = things;
  }
}

module.exports = I1820Agent;
