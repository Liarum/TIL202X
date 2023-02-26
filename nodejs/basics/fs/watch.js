const fs = require('fs');

// watch
fs.watch('./target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});