import './Checkout.css';

export default function Header() {
    return (
        <div className="header-container d-flex justify-content-around">
            <img style={{maxWidth: '6em', maxHeight: '6em'}} className="logo" src="https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg" alt="logo" />
            <h1 style={{fontSize: '3rem'}}>Checkout</h1>
        </div>
    );
}
