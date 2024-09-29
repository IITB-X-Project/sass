import Footer from "./Footer.js";
import Navbar from "./Navbar.js";
import Products from "./Products.js";
import './ShoppingCartPage.css';

export default function ShoppingCartPage() {
    return (
        <div className="container-fluid mt-3 shopping-cart-page">
            <Navbar />
            <div className="row mt-5" data-aos="fade-up">
                <div className="col-md-12">
                    <Products />
                </div>
            </div>
            <Footer />
        </div>
    )
}
