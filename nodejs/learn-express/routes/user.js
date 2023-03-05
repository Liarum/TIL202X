const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, User!');
});

// 라우트 매개변수 패턴 -> 일반 라우터보다 뒤에 위치해야 함
router.get('/:id', function(req, res) {
    console.log(req.params, req.query);
});

router.get('/like', function(req, res) {
    console.log('라우트 매개변수를 쓰는 라우터보다 위에 위치해야 합니다.');
});

module.exports = router;