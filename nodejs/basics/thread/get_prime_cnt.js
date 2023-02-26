// get prime number count without using worker thread
const min = 2;
const max = 10000000;
const primes = [];

function generatePrimes(start, range) {
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

console.time('prime sthread');
generatePrimes(min, max);
console.timeEnd('prime sthread');
console.log(primes.length);
