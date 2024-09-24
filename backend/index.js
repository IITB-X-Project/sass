const express=require("express")
const connectDB = require("./db");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors()) 
connectDB();

const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});