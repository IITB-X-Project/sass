import React from 'react';
import Navbar from './Navbar';
import FilterSidebar from './FilterSidebar';
import Card from './Card';
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-6 flex">
        <FilterSidebar />
        <div className="flex-1 p-4">
          <Card/>
        </div>
      </div>
    </div>
  );
};

export default App;
