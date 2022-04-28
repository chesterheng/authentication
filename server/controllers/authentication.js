const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  // auth email and password
  // return a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Please provide email and password." });
  }

  // see if email exists
  User.findOne({ email }, function (err, existingUser) {
    if (err) return next(err);

    // if exist, return error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // if not exist, create and save user record
    const user = new User({ email, password });
    user.save(function (err) {
      if (err) return next(err);
      // response to indicate user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
