const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream); // 스트림끼리 연결하는 것을 '파이핑한다' 고 표현함.

// zlib
const zlib = require('zlib');
const readStream2 = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream2 = fs.createWriteStream('./readme4.txt.gz');
readStream2.pipe(zlibStream).pipe(writeStream2);

