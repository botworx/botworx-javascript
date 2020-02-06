const { Runner } = require('./runner')
//
//Agent
//
class Actor extends Runner {
  constructor(init) {
    super(init);
  }
}

exports.Actor = Actor;
exports.actor_ = init => new Actor(init);
