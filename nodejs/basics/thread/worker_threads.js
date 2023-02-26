// multi-threading for nodeJS
const {
    Worker, isMainThread, parentPort,
} = require('nodejs/basics/thread/worker_threads');

if (isMainThread) { // 부모일 때
    const worker = new Worker(__filename); // 현재 파일을 워커 스레드에서 실행
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker exit'));
    worker.postMessage('ping');
} else { // 워커일 때
    parentPort.on('message', (value) => { // worker에서 on 메서드를 사용할 때는 직접 워커를 종료해야 함.
        console.log('from parent', value);
        parentPort.postMessage('ping');
        parentPort.close(); // 부모와의 연결 종료
    })
}