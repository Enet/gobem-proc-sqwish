# gobem-proc-sqwish
This processor for [gobem](https://github.com/Enet/gobem) minifies CSS files using **sqwish**. If an argument `ignore-errors` is passed and error occured, raw CSS will be written instead minified one.

**gobem-proc-sqwish** requires redis database to cache results.

### Example for **build.gb**
```javascript
select 0 ^components\/(\w+)\/\1\.css$
process gobem-proc-sqwish ignore-errors
write 1

select 0 ^styles/[^.]\.css$
process gobem-proc-sqwish
write 1
```
