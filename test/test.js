/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 28-06-2017
 * |
 * | File Name:     test.js
 * +===============================================
 */
/* eslint-env mocha */

const I1820Client = require('..').I1820Client
const assert = require('assert')

describe('Aolab', function () {
  this.timeout(3000)

  const i1820 = new I1820Client('http://iot.ceit.aut.ac.ir:58902', true)
  let i1820Agents = []

  before('discovery', (done) => {
    i1820.discovery().then((agents) => {
      assert.ok(Array.isArray(agents))
      i1820Agents = agents
      done()
    })
  })

  describe('log', () => {
    it('mutlisensor', (done) => {
      i1820Agents[0].getThingsByType('multisensor')[0].log.then((result) => {
        console.log(JSON.stringify(result['light']))
        assert.equal(typeof result, 'object')
        done()
      })
    })

    it('gas', (done) => {
      i1820Agents[0].getThingsByType('gas')[0].log.then((result) => {
        console.log(JSON.stringify(result['gas']))
        assert.equal(typeof result, 'object')
        done()
      })
    })
  })
})
