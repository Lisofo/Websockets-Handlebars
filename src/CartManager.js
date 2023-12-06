const fs = require("fs").promises;

class CartManager {
  constructor() {
    this.path = "../carts.json";
  }

  async readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async createCart() {
    const carts = await this.readFile();

    if (carts.length === 0) {
      const cart = { id: 1, products: [] };
      carts.push(cart);
    } else {
      const cart = { id: carts.length + 1, products: [] };
      carts.push(cart);
    }

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");
  }

  async getCartById(cid) {
    try {
      const carts = await this.readFile();

      if (!carts || carts.length === 0) {
        return "No hay carritos";
      }

      const cart = carts.find((cart) => cart.id === cid);

      if (!cart) {
        return "No hay un carrito con esa id";
      }

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProduct(pid) {
    const products = await this.readFile();
    return products.some((p) => p.id === pid);
  }

  async addProdToCart(cid, pid, quantity = 1) {
    try {
      const carts = await this.readFile();
      const index = carts.findIndex((cart) => cart.id === cid);

      if (index === -1) {
        return "No hay carrito con esa id";
      }

      if (!(await this.getProduct(pid))) {
        return "El producto no existe";
      }

      if (!carts[index].products) {
        carts[index].products = [];
      }

      const index2 = carts[index].products.findIndex(
        (product) => product.productId === pid
      );

      if (index2 === -1) {
        carts[index].products.push({ productId: pid, quantity });
      } else {
        carts[index].products[index2].quantity += quantity;
      }

      await fs.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");

      return "Producto agregado al carrito";
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCart(cid) {
    try {
      const carts = await this.readFile();
      const index = carts.findIndex((cart) => cart.id === cid);

      if (index !== -1) {
        carts.splice(index, 1);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");
        return "Carrito eliminado";
      } else {
        return "No hay un carrito con esa id";
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CartManager;
