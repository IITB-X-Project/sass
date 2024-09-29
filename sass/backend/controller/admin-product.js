const Product = require('../schema/product'); 



// Create a new product
const createProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, salePrice, totalStock, averageReview, isAvailable } = req.body;
    const tags = [title, category, brand, description];
    console.log("Tags:", tags);
    const newProduct = await Product.create({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview,
        isAvailable,
        tags,
      });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });

  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};




// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({products});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};




// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};




// Update a product by ID
const updateProduct = async (req, res) => {
    try {
      const { image, title, description, category, brand, price, salePrice, totalStock, averageReview, isAvailable } = req.body;
  
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          image,
          title,
          description,
          category,
          brand,
          price,
          salePrice,
          totalStock,
          averageReview,
          isAvailable,
        },
        { new: true} 
      );
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' }); 
      }
      
      res.status(200).json({ message: 'Product updated successfully', product }); 
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  };
  



// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};




// Filtering the products
const filterProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, minRating, maxRating, category } = req.query;
    const filter = {};

    if (minPrice) {
      filter.price = { $gte: Number(minPrice) }; 
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) }; 
    }
    if (minRating) {
      filter.averageReview = { $gte: Number(minRating) }; 
    }
    if (maxRating) {
      filter.averageReview = { ...filter.averageReview, $lte: Number(maxRating) }; 
    }
    if (category) {
      filter.category = category; 
    }

    console.log(filter);
    const products = await Product.find(filter);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while filtering products' });
  }
};





module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProducts,
};