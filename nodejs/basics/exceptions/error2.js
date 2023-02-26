const fs = require('fs');

// 노드 내장 모듈의 에러는 실행중인 프로세스를 멈추지 않음
setInterval(() => {
    fs.unlink('./abcdefg.js', (err) => {
        if (err) {
            console.error(err);
        }
    });
}, 1000);
