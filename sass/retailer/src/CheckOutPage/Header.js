import logo from '../assets/demo.png';

export default function Header() {
    return (
        <div className="header-container d-flex justify-content-around">
            <img style={{maxWidth: '6em', maxHeight: '6em'}} className="logo" src={logo} alt="logo" />
            <h1 style={{fontSize: '3rem'}}>Checkout</h1>
        </div>
    );
}
