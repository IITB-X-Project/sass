const Product = require('../schema/product');
const User = require("../schema/user"); 

// Function to search products and log search history


const searchProduct=async(req, res) =>{
  const { query } = req.params;

  try {
    // Assume you have a Product model imported
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Add the search query to the user's search history
    // await User.findByIdAndUpdate(req.user._id, {
    //   $push: {
    //     searchHistory: {
    //       query, 
    //       createdAt: new Date(),
    //     },
    //   },
    // });

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in searchProduct:", error);
    res.status(500).json({ message: 'Server error', error });
  }
}

  
  module.exports = { searchProduct };