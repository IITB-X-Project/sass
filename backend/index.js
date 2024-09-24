const express=require("express")
const connectDB = require("./db");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors()) 
connectDB();

const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
app.use("/api/products", productRoutes);
app.use("/api/orders", productRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});