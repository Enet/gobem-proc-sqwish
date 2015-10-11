'use strict';

var sqwish = require('sqwish'),
    redis = require('redis');

module.exports = function () {
    let client;

    return {
        before: function (next) {
            client = redis.createClient();
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

        clear: function (next) {
            client.end();
            next();
        }
    };
};
