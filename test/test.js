const I1820Client = require('..').I1820Client;

const i1820 = new I1820Client('http://iot.ceit.aut.ac.ir:58902');

i1820.discovery().then((agents) => {
  agents.forEach((agent) => {
    agent.things.forEach((thing) => {
      if (thing.type === 'multisensor') {
        i1820.getLog(thing).then((result) => {
          console.log(result);
        });
      }
    });
  });
});
