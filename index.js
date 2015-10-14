'use strict';

var sqwish = require('sqwish'),
    redis = require('redis');

module.exports = function () {
    let client,
        key = 'gobem-proc-sqwish';

    return {
        before: function (next) {
            client = redis.createClient();
            client.expire(key, 86400);
            next();
        },

        process: function (next, input, output, args, content, path) {
            if (!content) return next();
            client.hget(key, content, function (error, reply) {
                if (reply === null) {
                    try {
                        output.set(path, sqwish.minify(content));
                        client.hset(key, content, output.get(path), next);
                    } catch (error) {
                        output.set(path, content);
                        next(~args.indexOf('ignore-errors') ? null : error);
                    }
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
