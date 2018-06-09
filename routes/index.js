'use strict';

import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({ express: 'Hello From Express' });
});

router.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello hi From Express' });
});

module.exports = router;
