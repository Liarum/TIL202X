const min = 2;
const max = 10000000;
let primes = [];

function findPrimes(start, range) {
    let isPrime = true;
    const end = start + range;

    for (let i = start; i < end; i++) {
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i != j && i % j === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
    const threadCount = 8;
    const threads = new Set();
    const range = Math.ceil((max - min) / threadCount);
    let start = min;

    console.time('prime mthreads');

    for (let i = 0; i < threadCount; i++) {
        const wStart = start;
        threads.add(new Worker(__filename, { workerData: { start: wStart, range } }));
        start += range;
    }
    // thread 간의 통신 비용 발생
    threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min) + 1) % threadCount } }));
    for (let worker of threads) {
        worker.on('error', (err) => {
            throw err;
        });

        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                console.timeEnd('prime mthreads');
                console.log(primes.length);
            }
        });
        worker.on('message', (msg) => {
            primes = primes.concat(msg);
        });
    }
} else {
    findPrimes(workerData.start, workerData.range);
    parentPort.postMessage(primes);
}