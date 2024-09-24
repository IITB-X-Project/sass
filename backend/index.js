const express=require("express")
const connectDB = require("./db");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors()) 
connectDB();

const productRoutes = require("./routes/product");
const searchRoutes = require("./routes/search");
const orderRoutes=require("./routes/order")
const cartRoutes = require('./routes/cart');
const addressRoutes = require('./routes/address');
app.use("/api/products", productRoutes);
app.use("/api/search",searchRoutes );
app.use("/api",orderRoutes );
app.use('/api/cart', cartRoutes);
app.use('/api/addresses', addressRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});