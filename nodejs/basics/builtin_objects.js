// global
global.message = 'Hello World!';
console.log(global.message);

// console
const string = 'abc';
const number = 123;
const boolean = true;
const obj = {
    outside: {
        inside: {
            key: 'value',
        },
    },
};
console.time('전체 시간');
console.log('basic log');
console.log(string, number, boolean);
console.error('error! error! error!');
console.table([{ name: '제로', birth: 1992 }, {name: 'hero', birth: 2002 }]);
console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time('시간 측정');
for (let i = 0; i < 100000; i++) {}
console.timeEnd('시간 측정');

function b() {
    console.trace('에러 위치 추적');
}
function a() {
    b();
}
a();
console.timeEnd('전체 시간');


// timer
const timeout = setTimeout(() => {
    console.log('1.5초 후 실행');
}, 1500);
const interval = setInterval(() => {
    console.log('1초마다 실행');
}, 1000);
const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다');
}, 3000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearTimeout(interval);
}, 2500);

// setImmediate(callback) VS setTimeOut(callback, 0) -> 특정 경우에는 setImmediate이 먼저 실행됨 but not all cases
const immediate = setImmediate(() => {
    console.log('즉시 실행');
});
const immediate2 = setImmediate(() => {
    console.log('실행되지 않습니다.');
});
clearImmediate(immediate2);

// __filename, __dirname
console.log(__filename);
console.log(__dirname);


// module.exports and this
console.log(this);
console.log(this === module.exports); // 최상위 스코프에 존재하는 this는 module.exports(or exports)를 가리킴
console.log(this === exports);
function whatIsThis() {
    console.log('function', this === exports, this === global); // 함수 내부에서 this는 global 객체를 가리킴
}
whatIsThis();

