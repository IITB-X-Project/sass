import './Checkout.css';
import Header from "./Header";
import Main from "./Main";

export default function CheckOutPage({ totalPrice, discount }) {
    return (
        <div className="checkout-page">
            <Header />
            <Main totalPrice={totalPrice} discount={discount} />
        </div>
    );
}
