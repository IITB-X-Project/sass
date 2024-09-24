const Product = require('../schema/product'); 




// Create a new product
const createProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, salePrice, totalStock, averageReview, isAvailable } = req.body;
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




module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
