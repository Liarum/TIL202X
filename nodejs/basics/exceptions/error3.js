const fs = require('fs').promises;

setInterval(() => {
    fs.unlink('./abcdefg.js'); // 프로미스의 에러는 catch하지 않아도 처리됨 but 항상 catch를 붙여주는 것을 권장
}, 1000);