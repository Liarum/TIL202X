const cluster = require('nodejs/basics/mutl_processing/cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;


const formattedDate = (timestamp) => {
    return new Date(timestamp).toLocaleString()
        // .toISOString().replace('T', ' ').substr(0, 19);
}

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // cpu 갯수만큼 워커를 생성
    for (let i=0; i < numCPUs; i++) {
        cluster.fork();
    }
    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${formattedDate(Date.now())} ${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);

        cluster.fork(); // 워커프로세스가 종료되었을 때 새로운 워커 생성
    });
} else {
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');

        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }).listen(8086);
    console.log(`${formattedDate(Date.now())} ${process.pid}번 워커 실행`);
}