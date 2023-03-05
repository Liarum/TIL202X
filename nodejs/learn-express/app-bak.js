const express = require('express');
const path = require('path');


const app = express();
app.set('port', process.env.PORT || 3000);

// middleware는 보통 app.use(middleware)꼴로 사용됨
// 첫 번째 인수로 주소를 넣어주지 않으면 모든 요청에서 미들웨어 실행됨, 주소를 넣어주면 해당 주소의 요청에서만 실행.
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next(); // 다음 미들웨어로 넘어가는 함수, next를 실행하지 않으면 다음 미들웨어가 실행되지 않음
});

app.get('/', (req, res, next) => {
    // res.send('Hello Express');
    // res.sendFile(path.join(__dirname, '/public/html/index.html'));

    console.log('get 요청에만 실행됩니다.');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

// 에러처리 미들웨어는 첫번째 인수로 error를 넘겨주어야 함
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});