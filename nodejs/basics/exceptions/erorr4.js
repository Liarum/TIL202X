// uncautException 이벤트 발생 후 다음 동작이 제대로 동작하는지를 보증하지 않음.
process.on('uncaughtException', (err) => {
    console.log('예기치 못한 에러', err);
}); // 에러 내용을 기록하는 정도로 사용하고, 기록 후 process.exit() 으로 프로세스를 종료하는 것이 좋다.

setInterval(() => {
    throw new Error('Error! Error! Error!');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다.');
}, 2000);
