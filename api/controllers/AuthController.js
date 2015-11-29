var Passport = require('passport');

module.exports = {
    login: function (req, res, next) {
        var username = req.body.username;

        User.findOne({username: username}).then(function (user) {
            console.log("User: ", user)
            // Login
            if (user) {
                Passport.authenticate('local', function (err, user, info) {
                    if (err) {
                        return next(err);
                    }
                    if (!user) return res.badRequest();
                    req.logIn(user, function (err) {
                        if (err) {
                            return next(err);
                        }
                        return res.ok();
                    });
                })(req, res, next);
            } else { // Register
                console.log("Creating")
                User.create({
                        username: username,
                        password: req.body.password
                    })
                    .then(function (user) {
                        console.log("Created")
                        req.login(user, function (err) {
                            if (err) return next(err);
                            return res.ok();
                        });
                    })
                    .catch(function (err) {
                        console.log("Caught")
                        console.error(err);
                        return res.serverError(err);
                    });
            }
        });
    },

    checkUsername: function (req, res) {
        var username = req.body.username;

        User.findOne({username: username})
            .then(function (user) {
                return res.json({taken: user !== undefined});
            }).catch(function (err) {
            return res.serverError(err);
        });
    },

    logut: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};
