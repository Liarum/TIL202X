const http = require('http');
http.createServer((req, res) => {
    // response code below

    res.writeHead(200, { 'Content-Type': 'text/html; charset charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server! </p>'); // 응답 종료
})
    .listen(8080, () => {
        console.log('8080번 포트에서 서버 대기 중입니다.');
    });

http.createServer((req, res) => {
    // response code below

    res.writeHead(200, { 'Content-Type': 'text/html; charset charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server! </p>'); // 응답 종료
})
    .listen(8081, () => {
        console.log('8081번 포트에서 서버 대기 중입니다.');
    });
