const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]');
    }
  }

  readProductsFromFile() {
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data);
  }

  writeProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }

  addProduct(product) {
    const products = this.readProductsFromFile();
    const newProduct = {
      id: products.length + 1,
      ...product,
    };
    products.push(newProduct);
    this.writeProductsToFile(products);
  }

  getProducts() {
    return this.readProductsFromFile();
  }

  getProductById(id) {
    const products = this.readProductsFromFile();
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const products = this.readProductsFromFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Prodcut not found');
    }

    products[index] = { ...products[index], ...updatedFields, id };
    this.writeProductsToFile(products);
  }

  deleteProduct(id) {
    const products = this.readProductsFromFile();
    const updatedProducts = products.filter((p) => p.id !== id);
    if (products.length === updatedProducts.length) {
      throw new Error('Product not found');
    }
    this.writeProductsToFile(updatedProducts);
  }
}


const productManager = new ProductManager('productos.json');

console.log(productManager.getProducts());

productManager.addProduct({
    title: "Superman el Nuevo Mundo",
    description: "lorem",
    price: 4500,
    thumbnail: "imagen",
    code: "P1",
    stock: 75,
});
productManager.addProduct({
    title: "Batman la broma asesina",
    description: "lorem",
    price: 5000,
    thumbnail: "imagen",
    code: "P2",
    stock: 75,
});
productManager.addProduct({
    title: "Civil War parte 1",
    description: "lorem",
    price: 3200,
    thumbnail: "imagen",
    code: "P3",
    stock: 75,
});
productManager.addProduct({
    title: "Deadpool Clasico Vol. 3",
    description: "lorem",
    price: 7000,
    thumbnail: "imagen",
    code: "P4",
    stock: 75,
});


console.log(productManager.getProducts()); 

console.log(productManager.getProductById(1));

productManager.updateProduct(1, { price: 2.55 });

console.log(productManager.getProductById(1)); 

productManager.deleteProduct(2);

try {
  console.log(productManager.getProductById(2));
} catch (error) {
  console.error(error.message);
}