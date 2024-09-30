import React from 'react';
import toast from 'react-hot-toast';
import { useProducts } from '../../../Hooks/productHooks';
import Spinner from '../../../Components/spinner/Spinner';


interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Filter({ 
  selectedCategory, 
  setSelectedCategory, 
  priceRange, 
  setPriceRange,
  searchQuery,
  setSearchQuery
}: FilterProps) {
  const { products: allProducts, error, isLoading } = useProducts();

  const categories = allProducts 
    ? Array.from(new Set(allProducts.map((product: { category: string }) => product.category))) as string[]
    : [];

  const maxPrice = allProducts 
    ? Math.max(...allProducts.map((product: { price: number }) => product.price))
    : 1000;

  function handleCategorySelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(event.target.value);
  }

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    setPriceRange(prev => [prev[0], value]);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  if (error) toast.error(error.message);
  
  if (isLoading) return <Spinner />;
  return (
    <div className="filter-container m-2">
      <h4>Filters</h4>
      <div className="mb-3">
        <label htmlFor="category-select" className="form-label">Category</label>
        <select
          id="category-select"
          className="form-select border border-info shadow-sm"
          value={selectedCategory}
          onChange={handleCategorySelect}
        >
          <option value="All">All</option>
          {categories?.map((cat: string, index: number) => (
            <option value={cat} key={index}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="search-input" className="form-label">Search by Title</label>
        <input
          type="text"
          className="form-control"
          id="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter book title..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price-range" className="form-label">Max Price: ${priceRange[1]}</label>
        <input
          type="range"
          className="form-range"
          id="price-range"
          min="0"
          max={maxPrice}
          value={priceRange[1]}
          onChange={handlePriceChange}
        />
      </div>

    </div>
  );
}
