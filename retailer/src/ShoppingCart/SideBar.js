export default function SideBar({ price, discount }) {
    return (
        <div className="card flex-grow-1 d-flex flex-column justify-content-between">
            <div className="card-header" style={{marginBottom: '10em'}}>
                <h4>Price Details</h4>
            </div>
            <div className="card-body d-flex flex-column" style={{gap: '3rem'}}>
                <p><strong>Total Price:</strong> ${price}</p>
                <p><strong>Discount:</strong> ${discount}</p>
                <p><strong>Delivery:</strong> Free</p>
                <p><strong>Charges:</strong> ${price - discount}</p>
            </div>
        </div>
    );
}
