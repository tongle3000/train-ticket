
// h0 获取 除去 小时 分钟 秒 毫秒 的时间;
export function h0(timestamp = Date.now()) {
    const target = new Date(timestamp);

    target.setHours(0);
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);
    
    return target.getTime();
}
