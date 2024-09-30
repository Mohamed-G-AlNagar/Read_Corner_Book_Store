

// import Card from '../../../Components/card/Card';


// interface CardsProps {
//   selectedCategory: string;
//   filteredProducts:any[];
// }

// function Cards({filteredProducts, selectedCategory}:CardsProps) {
  
//   return (
//     <div className="container-fluid text-center w-100">
//       <h4 className="mt-2 mb-2">
//         <strong>{selectedCategory} products</strong>
//       </h4>
//       <div className="container w-100 py-2">
//         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
//           {filteredProducts?.map((product: any) => (
//             <div className="col" key={product.productName}>
//               <Card product={product} key={product.productName} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cards;


import Card from '../../../Components/card/Card';

interface CardsProps {
  selectedCategory: string;
  filteredProducts: any[];
}

function Cards({ filteredProducts, selectedCategory }: CardsProps) {
  return (
    <div className="container-fluid text-center w-100">
      <h4 className="mt-2 mb-2">
        <strong>{selectedCategory} products</strong>
      </h4>
      <div className="container w-100 py-2">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredProducts?.map((product: any) => (
            <div className="col" key={product.productName}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
