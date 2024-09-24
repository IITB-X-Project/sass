import Footer from "./Footer.js";
import Navbar from "./Navbar.js";
import Products from "./Products.js";

export default function ShoppingCartPage() {
    return (
        <div className="container-fluid mt-3">
            <Navbar />
            <div className="row mt-5">
                <div className="col-md-12">
                    <Products />
                </div>
            </div>
            <Footer />
        </div>
    )
}
