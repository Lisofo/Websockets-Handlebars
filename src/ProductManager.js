//Santiago Castanares

const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.readFile();
  }

  addProduct(product) {
    if (!product.title || !product.price) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    if (this.products.some(existingProduct => existingProduct.code === product.code)) {
      console.log('Ya existe un producto con el mismo código');
      return;
    }

    product.id = this.nextId++;
    this.products.push(product);

    this.writeFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const productId = parseInt(id);

    const product = this.products.find(product => product.id === productId);
    if (product) {
      return product;
    } else {
      console.log('Product not found');
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const product = this.getProductById(id);
    if (!product) {
      console.log('Product not found');
      return;
    }

    if ('id' in updatedFields) {
      console.log('El id no se puede actualizar');
      return;
    }

    Object.assign(product, updatedFields);

    this.writeFile();

    return product;
  }

  deleteProduct(id) {
    const product = this.getProductById(id);
    if (!product) {
      console.log('Product not found');
      return;
    }

    this.products = this.products.filter(p => p.id !== id);

    this.writeFile();

    return product;
  }

  readFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  writeFile() {
    const products = JSON.stringify(this.products);
    fs.writeFileSync(this.path, products);
  }
}

module.exports = ProductManager;
