const passport = require('passport')
const User = require('./Model/userModel')
// const JWTStrategy = require('passport-jwt').Strategy

// passport.use(new JWTStrategy)

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'something-secret-to-be-saved-in-the-env';

console.log(opts);

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    User.findOne({_id: jwt_payload.userId}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));