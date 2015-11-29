/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var setupPassport = function () {
    var Passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    // Serialization related functions
    Passport.serializeUser(function (user, done) {
        done(null, user.id)
    });
    Passport.deserializeUser(function (id, done) {
        User.findOne(id)
            .then(function (user) {
                if (user === undefined) user = null;
                done(null, user)
            }).catch(function (err) {
            done(err)
        });
    });
    Passport.use(new LocalStrategy({usernameField: "email"}, function (email, password, done) {
            User.findOne({email: email}, function (err, user) {
                if (err) return done(err);
                if (!user) return done(null, false);
                if (!user.verifyPassword(password)) return done(null, false);
                return done(null, user);
            });
        }
    ));
};

module.exports.bootstrap = function (cb) {
    setupPassport();

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
};
