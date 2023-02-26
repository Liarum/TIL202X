// modules using threadpool : crypto, zlib, dns, lookup

const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

// 기본 스레드풀의 개수는 네 개이므로 처음 네 작업이 동시에 실행 -> 그 다음 네 작업이 실행 ... (코어 개수 >= 4)
// UV_THREADPOOL_SIZE = 스레드풀 개수
crypto.pbkdf2(pass, salt, 10000000, 128, 'sha512', () => {
    console.log('1:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 10000000, 128, 'sha512', () => {
    console.log('2:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 10000000, 128, 'sha512', () => {
    console.log('3:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 10000000, 128, 'sha512', () => {
    console.log('4:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 10000000, 128, 'sha512', () => {
    console.log('5:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 10000000, 128, 'sha512', () => {
    console.log('6:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 10000000, 128, 'sha512', () => {
    console.log('7:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 10000000, 128, 'sha512', () => {
    console.log('8:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 10000000, 128, 'sha512', () => {
    console.log('9:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 10000000, 128, 'sha512', () => {
    console.log('10:', Date.now() - start);
});