const crypto =  require('crypto');

// one-way encryption (hashing)
console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));


// pbkdf2
crypto.randomBytes(64, (err, buf) => {// 64바이트 길이의 문자열을 만든다.
    const salt = buf.toString('base64');
    console.log('salt:', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {// 10만번 반복
        console.log('password:', key.toString('base64'));
    }); // randomBytes, pbkdf2 메서드는 내부적으로 스레드풀을 사용해 멀티 스레딩으로 동작함.
});


// two-way encryption (encryption)
const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456'; // aes-256-cbc 알고리즘 사용 시 키는 32바이트여야 함
const iv = '1234567890123456'; // 암호화할 때 사용하는 초기화 벡터

const cipher = crypto.createCipheriv(algorithm, key, iv);
let result = cipher.update('암호화할 문장', 'utf8', 'base64');
result += cipher.final('base64');
console.log('암호화:', result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log('복호화:', result2);




