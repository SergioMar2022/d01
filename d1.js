class Product {
    constructor(title, description, price, thumbnail, code, stock) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  }
  
  class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (this.products.some(product => product.code === code)) {
        throw new Error("El código del producto ya está en uso.");
      }
  
      const id = this.generateId();
      const product = new Product(title, description, price, thumbnail, code, stock, id);
      this.products.push(product);
      return product;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        throw new Error("Producto no encontrado.");
      }
      return product;
    }
  
    generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  }
  
  // Crear instancia de ProductManager
  const productManager = new ProductManager();
  
  // Probar métodos
  console.log(productManager.getProducts()); // []
  const newProduct = productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  console.log(newProduct); // Product { title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25, id: '_xxxxxxxxx' }
  console.log(productManager.getProducts()); // [Product {...}]
  try {
    productManager.addProduct("producto repetido", "Este es un producto repetido", 300, "Sin imagen", "abc123", 10);
  } catch (error) {
    console.log(error.message); // El código del producto ya está en uso.
  }
  const foundProduct = productManager.getProductById(newProduct.id);
  console.log(foundProduct); // Product { title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25, id: '_xxxxxxxxx' }
  try {
    productManager.getProductById("producto invalido");
  } catch (error) {
    console.log(error.message); // Producto no encontrado.
  }
  