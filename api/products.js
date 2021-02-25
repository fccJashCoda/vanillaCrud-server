const express = require('express');
const queries = require('../db/queries');

const router = express.Router();

function validateProduct(product) {
  if (!(typeof product.title == 'string' && product.title.trim() != ''))
    return false;
  if (isNaN(product.price) && product.price > 0) return false;
  if (isNaN(product.quantity)) return false;
  return true;
}

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

router.post('/', (req, res, next) => {
  if (validateProduct(req.body)) {
    const { title, description, price, quantity, image } = req.body;

    const product = {
      title,
      description,
      price,
      quantity,
      image,
    };

    queries.create(product).then((id) => {
      res.json({ id });
    });
  } else {
    const error = new Error('Invalid product');
    next(error);
  }
});

module.exports = router;
