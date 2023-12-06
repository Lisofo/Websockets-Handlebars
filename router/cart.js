// carts.js
const express = require('express');
const router = express.Router();
const CartManager = require('./CartManager');

const cartManager = new CartManager();

router.post('/', async (req, res) => {
  try {
    await cartManager.createCart();
    res.status(201).json({ message: 'Carrito creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/:cid', async (req, res) => {
  const cid = parseInt(req.params.cid);
  try {
    const cart = await cartManager.getCartById(cid);
    if (typeof cart === 'string') {
      res.status(404).json({ error: cart });
    } else {
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const { quantity } = req.body;
  
  try {
    const result = await cartManager.addProdToCart(cid, pid, quantity);
    if (typeof result === 'string') {
      res.status(400).json({ error: result });
    } else {
      res.json({ message: result });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.delete('/:cid', async (req, res) => {
  const cid = parseInt(req.params.cid);
  try {
    const result = await cartManager.deleteCart(cid);
    if (typeof result === 'string') {
      res.status(404).json({ error: result });
    } else {
      res.json({ message: result });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
