// In-memory data store
let products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 },
];

module.exports = {
  getAllProducts: () => products,
  getProductById: (id) => products.find((p) => p.id === parseInt(id)),
  createProduct: (name, price) => {
    const product = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      name,
      price,
    };
    products.push(product);
    return product;
  },
  updateProduct: (id, name, price) => {
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) return null;
    product.name = name || product.name;
    product.price = price || product.price;
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
};
