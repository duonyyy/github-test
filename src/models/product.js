// In-memory data store
let products = [
  { id: 1, name: 'Laptop', price: 1000, category: 'Electronics' },
  { id: 2, name: 'Phone', price: 500, category: 'Electronics' },
];

let categories = [
  { id: 1, name: 'Electronics', description: 'Electronic devices' },
  { id: 2, name: 'Accessories', description: 'Product accessories' },
];

module.exports = {
  getAllProducts: () => products,
  getProductById: (id) => products.find((p) => p.id === parseInt(id)),
  createProduct: (name, price, category) => {
    const product = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      name,
      price,
      category,
    };
    products.push(product);
    return product;
  },
  updateProduct: (id, name, price, category) => {
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) return null;
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    return product;
  },
  deleteProduct: (id) => {
    const index = products.findIndex((p) => p.id === parseInt(id));
    if (index === -1) return null;
    const deleted = products.splice(index, 1);
    return deleted[0];
  },
  searchProducts: (query) => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  },
  filterByPrice: (minPrice, maxPrice) => {
    return products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
  },
  getSortedAndPaginated: (
    sortBy = 'id',
    sortOrder = 'asc',
    page = 1,
    limit = 10
  ) => {
    let result = [...products];

    result.sort((a, b) => {
      const order = sortOrder === 'desc' ? -1 : 1;
      if (typeof a[sortBy] === 'string') {
        return a[sortBy].localeCompare(b[sortBy]) * order;
      }
      return (a[sortBy] - b[sortBy]) * order;
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: result.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalItems: products.length,
        totalPages: Math.ceil(products.length / limit),
      },
    };
  },
  getStatistics: () => {
    if (products.length === 0) {
      return {
        totalProducts: 0,
        averagePrice: 0,
        minPrice: 0,
        maxPrice: 0,
      };
    }

    const prices = products.map((p) => p.price);
    const averagePrice = (
      prices.reduce((a, b) => a + b, 0) / prices.length
    ).toFixed(2);

    return {
      totalProducts: products.length,
      averagePrice: parseFloat(averagePrice),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  },
  // Category functions
  getAllCategories: () => categories,
  getCategoryById: (id) => categories.find((c) => c.id === parseInt(id)),
  createCategory: (name, description) => {
    const category = {
      id: Math.max(...categories.map((c) => c.id), 0) + 1,
      name,
      description,
    };
    categories.push(category);
    return category;
  },
  updateCategory: (id, name, description) => {
    const category = categories.find((c) => c.id === parseInt(id));
    if (!category) return null;
    category.name = name || category.name;
    category.description = description || category.description;
    return category;
  },
  deleteCategory: (id) => {
    const index = categories.findIndex((c) => c.id === parseInt(id));
    if (index === -1) return null;
    const deleted = categories.splice(index, 1);
    return deleted[0];
  },
  getProductsByCategory: (categoryName) => {
    return products.filter((p) =>
      p.category.toLowerCase().includes(categoryName.toLowerCase())
    );
  },
};
