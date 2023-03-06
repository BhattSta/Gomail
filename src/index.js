const app = require('./app');
require('./config/mongodb.config');
const Router = require('./routes/index');

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Welcome To Home Page');
});

app.get('*', (req, res) => {
    res.send('Page Not Found');
});

app.listen(port, () => {
    console.log(`Running On Port ${port}`);
});