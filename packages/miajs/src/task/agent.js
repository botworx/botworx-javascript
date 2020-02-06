const { Runner } = require('./runner')
//
//Agent
//
class Agent extends Runner {
  constructor(init) {
    super(init);
  }
}

exports.Agent = Agent;
exports.agent_ = init => new Agent(init);
