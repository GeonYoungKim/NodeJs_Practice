const app = require('../index');
const syncDb = require('./sync-db');

syncDb().then(() => {
    console.log('sync DB!!!');
    app.listen(3000, () => {
        console.log('server is running');
    });
});

