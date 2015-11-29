module.exports = {
    login: function (req, res) {
        var email = req.body.email;

        User.findOne({email: email}).then(function (user) {
            if (user) return res.badRequest("That email is taken.");

            User.create({
                    email: email,
                    password: req.body.password
                })
                .then(function () {
                    return res.ok();
                })
                .catch(function (err) {
                    console.error(err);
                    return res.serverError(err);
                });
        });
    },

    checkEmail: function (req, res) {
        var email = req.body.email;

        User.findOne({email: email})
            .then(function (user) {
                return res.json({taken: user !== undefined});
            }).catch(function (err) {
            return res.serverError(err);
        });
    }
};
