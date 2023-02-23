const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb://localhost:27017/Users');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL);

const conn = mongoose.connection;
conn.on('open', () => {
    console.log('Database Connection Established');
})