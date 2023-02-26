// setInterval 사용 이유: 프로세스가 멈추는지 여부를 체크하기 위해서
setInterval(() => {
    console.log('시작');
    try {
        throw new Error('Error! Error! Error!'); // throw 를 하는 경우 노드 프로세스가 멈춤.
    } catch (err) {
        console.error(err);
    }
}, 1000);