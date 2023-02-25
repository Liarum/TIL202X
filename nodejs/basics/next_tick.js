setImmediate(() => {
    console.log('immediate');
});
process.nextTick(() => {
    console.log('nextTick');
}); // 가장 먼저 실행 됨.
setTimeout(() => {
    console.log('timeout');
}, 0);
Promise.resolve().then(() => console.log('promise')); // resolve 된 Promise도 nextTick 처럼 다른 콜백보다 우선시 됨.
// process.nextTick 과 Promise 를 마이크로태스크(microtask) 라고 함 -> microtask queue
