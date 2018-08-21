'use strict';

import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({ express: 'Hi from Express' });
});

router.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello from Express' });
});

module.exports = router;
