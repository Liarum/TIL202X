const fs = require('fs').promises;

fs.writeFile('./writeme.txt', 'write this text soon.')
    .then(() => {
        return fs.readFile('./writeme.txt');
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        console.error(err);
    });