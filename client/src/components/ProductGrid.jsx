
import React, { useEffect, useState } from 'react';
import { ProductCard, Pagination } from './Card'; 

const ProductGrid = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); 
      try {
        const query = new URLSearchParams({ ...filters, page: currentPage }).toString();
        const response = await fetch(`/api/products?${query}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
        setTotalPages(Math.ceil(data.count / 10)); 
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>; 

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductGrid;
