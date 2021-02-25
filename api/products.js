const express = require('express');
const queries = require('../db/queries');

const router = express.Router();

function _validateProduct(product) {
  return (
    typeof product.title == 'string' &&
    product.title.trim() != '' &&
    !isNaN(product.price) &&
    product.price > 0 &&
    !isNaN(product.quantity) &&
    Number.isInteger(product.quantity)
  );
}

function validId(req, res, next) {
  if (!isNaN(req.params.id)) {
    next();
  } else {
    const error = new Error('Invalid id');
    return next(error);
  }
}

function getProductFromBody(body) {
  const { title, description, price, quantity, image } = body;

  return {
    title,
    description,
    price,
    quantity,
    image,
  };
}

function validProduct(req, res, next) {
  if (_validateProduct(req.body)) {
    next();
  } else {
    const error = new Error('Invalid product');
    next(error);
  }
}

router.get('/', (req, res) => {
  queries.getAll().then((products) => res.json(products));
});

router.get('/:id', validId, (req, res, next) => {
  queries.getOne(req.params.id).then((product) => {
    if (product) {
      res.json(product);
    } else {
      next();
    }
  });
});

router.post('/', validProduct, (req, res, next) => {
  const product = getProductFromBody(req.body);

  res.json(product);

  // queries.create(product).then((id) => {
  //   res.json({ id });
  // });
});

router.put('/:id', validId, validProduct, (req, res, next) => {
  const product = getProductFromBody(req.body);

  queries
    .update(req.params.id, product)
    .then(() => res.json({ message: 'Updated!' }));
});

module.exports = router;
