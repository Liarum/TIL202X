const os = require('os');
console.log('====== 운영체제 정보 ======');
console.log('os.arch():', os.arch()); // === process.arch
console.log('os.platform():', os.platform()); // === process.platform
console.log('os.type():', os.type()); // type of os
console.log('os.uptime():', os.uptime()); // 운영체제 부팅 이후 흐른 시간(sec)
console.log('os.hostname():', os.hostname());
console.log('os.release():', os.release()); // os release version

console.log('====== 경로 ======');
console.log('os.homedir():', os.homedir()); // home directory path
console.log('os.tmpdir():', os.tmpdir()); // 임시 파일 저장 경로

console.log('====== cpu 정보 ======');
console.log('os.cpus():', os.cpus()); // cpu core information
console.log('os.cpus().length:', os.cpus().length); // cpu core count

console.log('====== 메모리 정보 ======');
console.log('os.freemem():', os.freemem()); // usable memory (RAM)
console.log('os.totalmem():', os.totalmem()); // total memory

// error and signals
console.log('os.constants:', os.constants);


