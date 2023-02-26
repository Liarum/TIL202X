const fs = require('fs').promises;
const constants = require('fs').constants;

// fsCreate
fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
    .then(() => {
        return Promise.reject('already exist folder');
    })
    .catch((err) => {
        if (err.code === 'ENOENT') {
            console.log('folder does not exist.');
            return fs.mkdir('./folder');
        }
        return Promise.reject(err);
    })
    .then(() => {
        console.log('success to create folder');
        return fs.open('./folder/file.js', 'w');
    })
    .then((fd) => {
        console.log('success to create empty file', fd);
        fs.rename('./folder/file.js', './folder/newfile.js');
    })
    .then(() => {
        console.log('success to change file name');
    })
    .catch((err) => {
        console.error(err);
    })

// fsDelete
fs.readdir('./folder')
    .then((dir) => {
        console.log('폴더 내용 확인', dir);
        return fs.unlink('./folder/newFile.js');
    })
    .then(() => {
        console.log('파일 삭제 성공');
        return fs.rmdir('./folder');
    })
    .then(() => {
        console.log('폴더 삭제 성공');
    })
    .catch((err) => {
        console.error(err);
    });


// copyFile: node >=8.5 에서는 pipe 하지 않아도 파일 복사 가능
fs.copyFile('readme4.txt', 'writeme4.txt')
    .then(() => {
        console.log('복사 완료');
    })
    .catch((err) => {
        console.error(err);
    });

/*
// watch
fs.watch('./target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});

fs.watch('./target.txt')
    .then((eventType, filename) => {
        console.log(eventType, filename);
    })
    .catch((err) => {
        console.error(err);
    });
 */