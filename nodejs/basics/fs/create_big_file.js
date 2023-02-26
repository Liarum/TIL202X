// create big size file
const fs = require('fs');

// // const file = fs.createWriteStream('./big.txt');
// // for (let i=0; i <= 10000000; i++) {
// //     file.write('Hello. I am gonna make big file!');
// // }
// file.end();

if (!fs.existsSync('./big.txt')) {
    const file = fs.createWriteStream('./big.txt');
    for (let i = 0; i <= 10000000; i++) {
        file.write('Hello. I am gonna make big file!');
    }
    file.end();
}


// copy using Buffer
if (!fs.existsSync('./big2.txt')) {
    console.log('before: ', process.memoryUsage().rss);

    const data1 = fs.readFileSync('./big.txt');
    fs.writeFileSync('./big2.txt', data1);
    console.log('buffer: ', process.memoryUsage().rss);
}

// copy using Stream
if (!fs.existsSync('./big3.txt')) {
    console.log('before: ', process.memoryUsage().rss);

    const readStream = fs.createReadStream('./big.txt');
    const writeStream = fs.createWriteStream('./big3.txt');
    readStream.pipe(writeStream);
    readStream.on('end', () => {
        console.log('stream: ', process.memoryUsage().rss);
    });
}