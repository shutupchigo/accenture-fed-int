import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { ProductCard } from './components/ProductCard/ProductCard';
import { ProductFilter } from './components/ProductFilter/ProductFilter';

function App() {



  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch('../products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
        setfilteredProducts(data)
      })
      .catch(error => {
        console.error(error)
        setHasError(true)
      });
    setIsLoading(false);
  }, []);

  const filteredProductList = (arr: never[], type: string) => {

    /** return only requested product */
    let products = arr.filter((item) => {
      if (type) {
        return item['type'] == type
      }
    })

    /** Return all products */
    if (type == 'all') {
      products = arr;
    }

    return products;
  }

  /** Prep data for dropdown product types in child component */
  const productTypes: string[] = [...new Set(products.map(item => item['type']))];

  const onTypeValueSelected = (filteredValue: string) => {
    setFilterText(filteredValue);
    setfilteredProducts(filteredProductList(products, filteredValue));
  }


  return (
    <main>
      <div className="container">
        <h1 className='text-center'>Products Finder</h1>
      </div>
      <div className="product__container--filter">
        <ProductFilter productTypes={productTypes} typeValueSelected={onTypeValueSelected} />
      </div>
      {filteredProducts &&
        <ul className="product__container--outer">
          {filteredProducts.map(item => (
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
