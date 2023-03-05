const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, Express');
});

// router.route 혹은 app.route -> 주소는 같지만 메서드가 다른 코드를 묶을 수 있다.
router.route('/abc')
    .get((req, res) => {
        res.send('GET /abc');
    })
    .post((req, res) => {
        res.send('POST /abc');
    });

module.exports = router;