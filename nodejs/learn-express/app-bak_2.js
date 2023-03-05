const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv'); // .env 파일을 읽어와서 process.env로 만듦
const path = require('path');
const fs = require('fs');
const { upload } = require('./multer');


dotenv.config();
const app = express();

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads dir does not exit. create uploads.');
    fs.mkdirSync('uploads');
}

// middleware - dotenv
app.set('port', process.env.PORT || 3000);

// middleware - morgan
app.use(morgan('dev'));  // 요청,응답에 대한 정보를 콘솔에 기록하는 middleware

// middleware - static
app.use('/', express.static(path.join(__dirname, 'public')));

// middleware - body-parser
app.use(express.json()); // 요청 데이터가 json 형식일 때
app.use(express.urlencoded({ extended: false })); // 요청 데이터가 url 주소 형식일 때
const bodyParser = require('body-parser'); // need to install package
app.use(bodyParser.raw()); // 요청 본문이 버퍼 데이터일 때
app.use(bodyParser.text());  // 요청 본문이 텍스트 데이터일 때

// middleware - cookie-parser
// 첫번째 인수로 비밀키를 넣어줄 수 있음. 서명된 쿠키가 있는 경우, 해당 쿠키가 내 서버에서 만든 쿠키임을 검증하는 용도
app.use(cookieParser(process.env.COOKIE_SECRET)); // 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만듦 (사명된 쿠키는 req.signedCookies)

// middleware - express-session
app.use(session({
    resave: false, // 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할 지
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할 지
    secret: process.env.COOkIE_SECRET,
    cookie: { // express 1.5이전일 경우 cookieParser보다 뒤에 위치해야 함
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie', // 기본 이름은 connect.sid
    // store 옵션이 없으면 메모리에 세션을 저장
}));

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});

app.get('/', (req, res, next) => {
    console.log('get 요청에만 실행됩니다.');
    // set cookie
    res.cookie('name', 'zerocho', {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        secure: true,
        signed: false, // true로 하면 쿠키뒤에 서명이 붙음
    });
    // clear cookie 쿠키를 지울때는 키와 값 외에 옵션도 정확히 일치해야 지워짐
    // res.clearCookie('name', 'zerocho', {
    //     httpOnly: true,
    //     secure: true,
    // })
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});


// file uploads
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/multipart.html'));
})
//  multer middlewares: single, array, fields, none
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file, req.body);
    res.send('ok');
});
app.post('/upload/many', upload.array('many'), (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
});


// 에러처리 미들웨어는 첫번째 인수로 error를 넘겨주어야 함
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});