// fetch API中最常用的是fetch方法，该方法最简单的形式是，接受一个 URL 参数并返回以一个 promise 对象：
fetch("/data.json").then(
    function (res) {
        // res instanceof Response == true.
        if (res.ok) {
            res.json().then(function (data) {
                console.log(data.entries);
            });
        } else {
            console.log(
                "Looks like the response wasn't perfect, got status",
                res.status
            );
        }
    },
    function (e) {
        console.log("Fetch failed!", e);
    }
);

/*

Fetch 和 promise 不足

1.不能中断，没有 abort、terminate、onTimeout 或 cancel 方法

2.缺少其它一些方法：always，progress，finally

3.没有 Deferred

4.没有获取状态方法：isRejected，isResolved

*/