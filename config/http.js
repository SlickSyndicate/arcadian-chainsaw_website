/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

    /****************************************************************************
     *                                                                           *
     * Express middleware to use for every Sails request. To add custom          *
     * middleware to the mix, add a function to the middleware config object and *
     * add its key to the "order" array. The $custom key is reserved for         *
     * backwards-compatibility with Sails v0.9.x apps that use the               *
     * `customMiddleware` config option.                                         *
     *                                                                           *
     ****************************************************************************/

    middleware: {
        order: [
            'startRequestTimer',
            'cookieParser',
            'session',
            'passportInit',
            'passportSession',
            'userToTemplate',
            'bodyParser',
            'handleBodyParserError',
            'compress',
            'methodOverride',
            'poweredBy',
            'router',
            'www',
            'favicon',
            '404',
            '500'
        ],

        passportInit: require('passport').initialize(),
        passportSession: require('passport').session(),
        userToTemplate: function (req, res, next) {
            res.locals.user = req.user;
            next();
        }
    },

    cache: 31557600000
};
