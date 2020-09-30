/**
 * 必须精通 Promise 
 */
const { readFile } = require("fs-extra");
const resolve = require("resolve");

readFile(filename, (err, content) => {
    parseXML(content, (err, xml) => {

    })
})


// promise
readFile(filename)
    .then((content) => parseXML(content))
    .then((xml) => {})
    .catch(error => {})

open().then(handle).then(close, close)
open().then(handle).finally(close)

Promise.resolve(1);  /*  等价于 */ new Promise( resolve => resolve(1) );
Promise.reject(error);  /*  等价于 */  new Promise( (resolve, reject) => reject(error) );



// 使用 await 可以把 链式 的 Promise 语句, 改成同步语句的样子, 改写上面读取 xml 文件的例子; await 需放在 async 里;
async function readXML(filename) {
    const content = await readFile(filename);
    const xml = await parseXML(content);
    return xml;
}

// 思考题:
// 我想用 promise 并行加载 100 张图片, 但最多允许 10 个 promise 同时运行, 如何做到这一点,并保证最大的效率;


