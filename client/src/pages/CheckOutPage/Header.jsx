import './CheckOutPage.css';

function Header() {
    return (
        <header className="bg-gray-800 shadow-md p-4 header">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <div className="logo text-slate-200 font-bold text-xl">
                    <img
                        width="65"
                        height="60"
                        src="https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg"
                        alt="eCommerce IIT Bombay"
                    />
                </div>
                <div className="flex space-x-4 mt-2 sm:mt-0">
                    <h1 style={{fontSize: '3rem'}}>Checkout</h1>
                </div>
            </div>
        </header>
    );
}

export default Header;
