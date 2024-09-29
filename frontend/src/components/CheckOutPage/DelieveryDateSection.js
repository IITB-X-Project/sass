import './Checkout.css';

export default function DeliveryDateSection({ date }) {
    return (
        <div className="delivery-date">
            <h1>Expected delivery date: {date}</h1>
        </div>
    );
}
