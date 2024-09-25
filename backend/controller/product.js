const Product = require('../schema/product');
const compression = require('compression');
const express = require('express');
const router = express.Router();

//Flags for response
const ResponseFlags = {
  SUCCESS: 0,
  PRODUCT_CREATED: 1,
  PRODUCT_UPDATED: 2,
  PRODUCT_DELETED: 3,
  PRODUCT_NOT_FOUND: 4,
  INVALID_INPUT: 5,
  SERVER_ERROR: 6,
};

//validating the imput using joi
const productSchema = Joi.object({
  image: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  price: Joi.number().min(0).required(),
  salePrice: Joi.number().min(0),
  totalStock: Joi.number().integer().min(0).required(),
  averageReview: Joi.number().min(0).max(5),
  isAvailable: Joi.boolean().required()
});


// Create a new product
const createProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ flag: ResponseFlags.INVALID_INPUT });

    const newProduct = await Product.create(req.body);
    res.status(201).json({ flag: ResponseFlags.PRODUCT_CREATED, id: newProduct._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};


// Get all products
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find()
        .select('title price averageReview')
        .lean()
        .skip(skip)
        .limit(limit),
      Product.countDocuments()
    ]);

    res.status(200).json({
      flag: ResponseFlags.SUCCESS,
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .select('title price description')
      .lean();
    
    if (!product) {
      return res.status(404).json({ flag: ResponseFlags.PRODUCT_NOT_FOUND });
    }
    res.status(200).json({ flag: ResponseFlags.SUCCESS, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ flag: ResponseFlags.SERVER_ERROR });
  }
};




// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, salePrice, totalStock, averageReview, isAvailable } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
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
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// Filter products
const filterProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, minRating, maxRating } = req.query;
    const filter = {};

    if (minPrice) filter.price = { $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (minRating) filter.averageReview = { $gte: Number(minRating) };
    if (maxRating) filter.averageReview = { ...filter.averageReview, $lte: Number(maxRating) };

    const products = await Product.find(filter);
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
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
