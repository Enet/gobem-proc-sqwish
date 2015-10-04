'use strict';

var sqwish = require('sqwish'),
    redis = require('redis');

module.exports = function () {
    let client = redis.createClient();

    return {
        before: function (next) {
            client.expire('sqwish', 86400);
            next();
        },

        process: function (next, input, output, args, content, path) {
            if (!content) return next();
            client.hget('sqwish', content, function (error, reply) {
                if (reply === null) {
                    output.set(path, sqwish.minify(content));
                    client.hset('sqwish', content, output.get(path), next);
                } else {
                    output.set(path, reply);
                    next();
                }
            });
        },

        after: function (next) {
            client.end();
            next();
        }
    };
};
