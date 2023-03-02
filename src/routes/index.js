const express = require('express');
const authRoute = require('./auth.route');
const mailRoute = require('./mail.route')

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/mails',
        route: mailRoute
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;