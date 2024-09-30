import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Category({ title, onClick, logo }) {
    return (
        <div 
            className="relative bg-cover bg-center rounded-xl shadow-xl border-2 border-gray-200 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
            style={{ backgroundImage: `url(${logo})`, height: '250px' }}
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex flex-col justify-center items-center">
                <h2 className="text-white font-cursive text-3xl transition-transform duration-300 transform hover:scale-110 shadow-lg">
                    {title}
                </h2>
                <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 rounded-xl"></div>
            </div>
        </div>
    );
}

function DashBoard() {
    const navigate = useNavigate();

    const categories = [
        { title: 'Electronics', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRth4FHgoxD8tpLsEIoE4wqq_hUaSa40dnqwg&s' }, 
        { title: 'Fashion', logo: 'https://thumbs.dreamstime.com/b/dating-group-young-people-men-women-s-s-fashion-style-clothes-posing-isolated-white-background-concept-culture-art-254474580.jpg' },
        { title: 'Home & Furniture', logo: 'https://static.vecteezy.com/system/resources/thumbnails/032/384/976/small_2x/furniture-on-white-background-ai-generative-photo.jpg' }, 
        { title: 'Mobiles', logo: 'https://previews.123rf.com/images/fkdkondmi/fkdkondmi1301/fkdkondmi130100012/17597496-mobile-phones-are-on-the-white-background.jpg' },
        { title: 'Appliances', logo: 'https://img.freepik.com/premium-vector/household-appliances-group-household-appliances-white-background_39422-20.jpg' },
        { title: 'Groceries', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_hiszvs04HIPecRgXgUYR0CmIMxXhndbNsQ&s' }, 
    ];

    const handleCategoryClick = (category) => {
        switch (category) {
            case 'Electronics':
                navigate('/electronics');
                break;
            case 'Fashion':
                navigate('/fashion');
                break;
            case 'Home & Furniture':
                navigate('/home-furniture');
                break;
            case 'Mobiles':
                navigate('/mobiles');
                break;
            case 'Appliances':
                navigate('/appliances');
                break;
            case 'Groceries':
                navigate('/groceries');
                break;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen flex flex-col" style={{
            backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/023/309/285/small_2x/ai-generative-e-commerce-online-shopping-concept-delivery-concept-photo.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            {/* Header */}
            <Header />

            {/* Full Screen Category Section */}
            <main className="flex-grow flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
                    {categories.map((category, index) => (
                        <Category 
                            key={index} 
                            title={category.title} 
                            logo={category.logo} 
                            onClick={() => handleCategoryClick(category.title)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default DashBoard;
