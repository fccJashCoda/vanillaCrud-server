const express = require('express');
const queries = require('../db/queries');

const router = express.Router();

router.get('/', (req, res) => {
  queries.getAll().then((products) => res.json(products));
});

router.get('/:id', (req, res, next) => {
  if (isNaN(req.params.id)) {
    const error = new Error('Invalid id');
    return next(error);
  }
  queries.getOne(req.params.id).then((product) => {
    if (product) {
      res.json(product);
    } else {
      next();
    }
  });
});

module.exports = router;
