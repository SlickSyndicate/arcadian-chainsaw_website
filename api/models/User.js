var BCrypt = require('bcrypt');

module.exports = {
    schema: true,
    attributes: {
        email: {
            type: 'email',
            unique: true,
            required: true
        },

        password: {
            type: 'string',
            required: true
        },

        salt: {
            type: 'string',
            required: true
        },

        validatePassword: function (password, cb) {
            BCrypt.compare(password, this.password, function (err, same) {
                if (err) {
                    console.error(err);
                    cb(err);
                } else {
                    cb(same);
                }
            })
        }
    },

    beforeValidate: function(user, cb) {
        BCrypt.genSalt(64, function(err, salt) {
           if (err) {
               console.error(err);
               cb(err);
           } else {
               user.salt = salt;
               cb(null, user);
           }
        });
    },

    beforeCreate: function(user, cb) {
        BCrypt.hash(user.password, user.salt, function(err, hash) {
           if (err) {
               console.error(err);
               cb(err);
           } else {
               user.password = hash;
               cb(null, user);
           }
        });
    }
};
