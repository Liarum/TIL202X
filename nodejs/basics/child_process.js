// exec
const exec = require('child_process').exec; // shell 을 실행해서 명령어를 수행

var process = exec('ls');
process.stdout.on('data', function(data) {
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
    console.log(data.toString());
}); // 실행 에러


// spawn
const spawn = require('child_process').spawn; // 새로운 프로세스를 띄우면서 명령어를 실행

var process = spawn('python', ['spawn_py.py']);
process.stdout.on('data', function(data) {
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
    console.error(data.toString());
}); // 실행 에러
