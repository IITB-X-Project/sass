import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer d-flex justify-content-end mt-5 mb-2" data-aos="fade-up">
            <Link className="btn btn-success footer-btn" to="/checkout">
                Place Order
            </Link>
        </div>
    );
}
