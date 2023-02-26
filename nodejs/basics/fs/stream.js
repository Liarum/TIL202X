const fs = require('fs');

// readStream
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 }); // highWaterMark: 버퍼의 크기 (default: 64KB)
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end: ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error:', err);
});


// writeStream
const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
    console.log('finish writing!');
});

writeStream.write('write this sentence.\n');
writeStream.write('write once again.');
writeStream.end();
