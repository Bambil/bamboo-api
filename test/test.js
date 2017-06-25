const I1820Client = require('..').I1820Client;
const tape = require('tape');

tape('Data retrieve with Aolab', (t) => {
  t.plan(5);

  const i1820 = new I1820Client('http://iot.ceit.aut.ac.ir:58902');

  i1820.discovery().then((agents) => {
    agents.forEach((agent) => {
      agent.getThingsByType('multisensor').forEach((thing) => {
        thing.log.then((result) => {
          t.comment(JSON.stringify(result));
          t.equal(typeof result, 'object');
        });
      });
    });
  });
});
