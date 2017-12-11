# gobem-proc-sqwish
**DON'T USE THE PACKAGE. IT'S DEPRECATED!!!
USE [webpack](https://github.com/webpack) INSTEAD.**

This processor for [gobem](https://github.com/Enet/gobem) minifies CSS files using **sqwish**. All options are passed as a single object. **gobem-proc-sqwish** requires directory to cache results of the work.

The following options are supported:
* `ignoreErrors`<br>
If this flag is `true` and error occured, raw file's content will be written instead minified one.
* `cacheDir`<br>
Full path to a readable and writable directory to cache files.

### Example for **build.js**
```javascript
module.exports = function () {
    return [
        ['select', 0, /^components\/(\w+)\/\1\.css$/],
        ['gobem-proc-sqwish', {
            ignoreErrors: true,
            cacheDir: '/var/www/gobem/cache'
        }],
        ['write', 1]
    ]; // this array will be used as build instructions
};
```
