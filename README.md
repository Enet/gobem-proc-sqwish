# gobem-proc-sqwish
This processor for [gobem](https://github.com/Enet/gobem) minifies CSS files using **sqwish**. All options are passed as a single object. **gobem-proc-sqwish** requires redis database to cache results of the work.

The following options are supported:
* `ignoreErrors`<br>
If this flag is `true` and error occured, raw file's content will be written instead minified one.
* `redisKey`<br>
The key in the redis database to store cache. Default value is `gobem-proc-sqwish`.
* `redisClient`<br>
Already created redis-client. [This](https://github.com/NodeRedis/node_redis) module is used.
* `redisOptions`<br>
Options for a new redis-client. This field is ignored, if `redisClient` is passed.

### Example for **build.js**
```javascript
module.exports = function () {
    return [
        ['select', 0, /^components\/(\w+)\/\1\.css$/],
        ['gobem-proc-sqwish', {
            ignoreErrors: true,
            redisOptions: {
                port: 6370
            }
        }],
        ['write', 1]
    ]; // this array will be used as build instructions
};
```
