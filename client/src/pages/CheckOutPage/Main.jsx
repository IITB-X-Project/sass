import axios from 'axios';
import React from 'react';
import SideBar from '../ShoppingCart/SideBar.jsx';
import './CheckOutPage.css';
import DeliveryDateSection from './DelieveryDateSection.jsx';

//There is isSelected flag on address which refers to the address selected by the user and a address id to change the selected address
//The adding of address is not implemented yet as well because login has not been implemented yet so i can not show the addresses yet
//These fields have not been added to the schema yet but they should be added as from an array of addresses isSelected field refers to the address selected for delievery
export default function Main() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const fetchAddress = async () => {
            try {
              const response = await axios.get('http://localhost:3000/api/addresses/address/:userId');
              setData(response.data.items);
            } catch (error) {
              console.error('Error fetching cart:', error);
            }
          };
          fetchAddress();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const handleClick = (id) => {
        const updatedAddresses = data.addresses.map((address) => {
            if (address.address_id === id) {
                return { ...address, isSelected: true };
            } else if (address.address_id !== id && address.isSelected === true) {
                return { ...address, isSelected: false };
            }
            return address;
        });

        setData({
            ...data,
            addresses: updatedAddresses,
        });
    };

    return (
        <div className="main-container container">
            <div className="delivery-section">
                <DeliveryDateSection date={data.addresses.phone} />
            </div>
            <div className="row d-flex align-items-stretch">
                <div className="col-md-8 address-section d-flex flex-column">
                    {data.addresses.map((address) => (
                        <div key={address.phone} className="address-card" onClick={() => handleClick(address.address_id)}>
                            <h3 className={address.isSelected ? "selected" : ""}>{address.address}</h3>
                        </div>
                    ))}
                </div>
                <div className="col-md-4 sidebar-section d-flex flex-column" data-aos="fade-left">
                    <SideBar />
                </div>
            </div>
        </div>
    );
}
