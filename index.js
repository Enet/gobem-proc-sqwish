'use strict';

var path = require('path'),
    fs = require('fs'),
    sqwish = require('sqwish'),
    crypto = require('crypto');

module.exports = function (options) {
    options = options || {};

    return {
        process: function (next, input, output, config, rawContent, rawPath) {
            if (!rawContent) return next();

            let key = crypto.createHash('md5').update(rawContent).digest('hex'),
                filePath = path.join(options.cacheDir + '', 'gobem-proc-sqwish^' + key);

            fs.readFile(filePath, 'utf8', (error, fileContent) => {
                if (error) {
                    try {
                        output.set(rawPath, sqwish.minify(rawContent));
                        fs.writeFile(filePath, output.get(rawPath), next);
                    } catch (error) {
                        output.set(rawPath, rawContent);
                        next(options.ignoreErrors ? null : error);
                    }
                } else {
                    output.set(rawPath, fileContent);
                    next();
                }
            });
        }
    };
};
