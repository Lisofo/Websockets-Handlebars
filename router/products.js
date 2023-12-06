const express = require('express');
const router = express.Router();
const ProductManager = require('./productManager'); // Cambiado a minúsculas

const productManager = new ProductManager('./products.json');

router.post('/', (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails = [],
  } = req.body;

  const newProduct = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  productManager.addProduct(newProduct);

  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
  const pid = req.params.pid;
  const updatedFields = req.body;

  const updatedProduct = productManager.updateProduct(pid, updatedFields);

  if (!updatedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(updatedProduct);
});

router.delete('/:pid', (req, res) => {
  const pid = req.params.pid;
  const deletedProduct = productManager.deleteProduct(pid);

  if (!deletedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(deletedProduct);
});

module.exports = router;
