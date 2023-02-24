const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
// console.log(process.env.SERVER_DB);
mongoose.connect(process.env.SERVER_DB);

const conn = mongoose.connection;
conn.on('open', () => {
    console.log('Database Connection Established');
})