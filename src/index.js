const app = require('./app');
require('./config/mongodb.config');
const UserRouter = require('./routes/auth.route');

const port = process.env.PORT || 8000;

app.use(UserRouter);

app.get('/', (req, res) => {
    res.send('Welcome To Home Page');
});

app.get('*', () => {
    res.send('Page Not Found');
});

app.listen(port, () => {
    console.log(`Running On Port ${port}`);
});