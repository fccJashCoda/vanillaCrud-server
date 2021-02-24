const express = require('express');
const queries = require('../db/queries');

const router = express.Router();

router.get('/', (req, res) => {
  queries.getAll().then((products) => res.json(products));
});

module.exports = router;
