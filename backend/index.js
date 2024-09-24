const express=require("express")
const connectDB = require("./db");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors()) 
connectDB();

const productRoutes = require("./routes/product");
const searchRoutes = require("./routes/search");
app.use("/api/products", productRoutes);
app.use("/api/search",searchRoutes );

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});