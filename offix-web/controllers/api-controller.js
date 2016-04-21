var _ = require('lodash');

var User = require('../models/user.js');

var ApiController = module.exports = {};

ApiController.users = function(req, res) {
  User.find({}, function(err, users) {
    var sorted = _.sortBy(users, function(user) {
      return -user.lastSeen.getTime(); // negative to sort in descending order
    });
    var data = _.map(sorted, function(user) {
      return {
        username: user.username,
        realName: user.realName,
        lastSeen: user.lastSeen || null,
        // can use `new Date(lastSeen)` to turn this back into a date
      };
    });
    res.json(data);
  });
};
