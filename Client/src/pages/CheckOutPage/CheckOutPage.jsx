import './Checkout.css';
import Header from "./Header.jsx";
import Main from "./Main.jsx";

export default function CheckOutPage({ totalPrice, discount }) {
    return (
        <div className="checkout-page">
            <Header />
            <Main totalPrice={totalPrice} discount={discount} />
        </div>
    );
}
