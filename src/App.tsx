import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { ProductCard } from './components/ProductCard/ProductCard';


function App() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch('../products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      })
      .catch(error => {
        console.error(error)
        setHasError(true)
      });
    setIsLoading(false);
  }, []);

  return (
    <main>
      {products &&
        <ul className='product__container--outer'>
          {products.map(item => (
            <li key={item['index']} className="product__container--inner">
              <ProductCard
                productName={item['productName']}
                productPrice={item['price']}
                isSale={item['isSale']}
                productType={item['type']}
                productImage={item['productImage']}
              />
            </li>
          ))}
        </ul>
      }
      {isLoading &&
        <p> Loading Data...</p>
      }
      {hasError &&
        <p> Sorry, something went wrong.</p>
      }
    </main >
  );
}

export default App;
