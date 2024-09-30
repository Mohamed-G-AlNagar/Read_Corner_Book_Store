
import  { useState } from "react";
import Filter from "./filter/Filter";
import Cards from "./cards/Cards";
import { useFilteredCategProducts } from "../../Hooks/filteredProductsHooks";
import Spinner from "../../Components/spinner/Spinner";
import toast from "react-hot-toast";

export default function FilterProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  console.log(selectedCategory,priceRange, searchQuery,"inside card-------")

  const { fiteredProducts, isLoading, error } = useFilteredCategProducts(selectedCategory);

  if (isLoading) return <Spinner />;
  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  const filteredProducts = fiteredProducts?.filter((product: any) => {
    return (
      product.price <= priceRange[1] &&
      product.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar ">
          <Filter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="col-md-9 col-lg-10 px-md-4 content ">
          <div className="w-100 d-flex justify-content-center">
            <Cards 
              selectedCategory={selectedCategory}
              filteredProducts={filteredProducts}
              />
            </div>
          </div>
      </div>
    </div>
  );
}