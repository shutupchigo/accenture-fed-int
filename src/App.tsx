import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { ProductCard } from './components/ProductCard/ProductCard';
import { ProductFilter } from './components/ProductFilter/ProductFilter';
import { ProductSearch } from './components/ProductSearch/ProductSearch';

function App() {

  /** init states */
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch(process.env.REACT_APP_BASE_URL + 'products.json')
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


  /** return only requested products in the filter */
  const filteredProductList = (arr: never[], key: string, value: string) => {

    let products = arr;

    /** return products if 'type' key matches with search */
    if (key === 'type') {
      products = arr.filter((item) => {
        if (value) {
          return item[key] === value
        }
      })
    }

    /** return products if 'productName' key matches with search */
    if (key === 'productName') {
      products = arr.filter((item) => {
        if (item) {
          // @ts-ignore
          if (item['productName'].toLowerCase().includes(value.toLocaleLowerCase())) {
            return item;
          }
        }

      })
    }

    /** Return all products */
    if (value === 'all' || value === '') {
      products = arr;
    }

    return products;
  }


  /** data to be sent to child components */
  const productTypes: string[] = [...new Set(products.map(item => item['type']))];
  const productNames: string[] = [...new Set(products.map(item => item['productName']))];


  /** set products afer dropdown filter selection */
  const onTypeValueSelected = (filteredValue: string) => {
    setfilteredProducts(filteredProductList(products, 'type', filteredValue));
  }

  /** set products after using search box */
  const onNameValueSelected = (filteredValue: string) => {
    setfilteredProducts(filteredProductList(products, 'productName', filteredValue));
  }


  return (
    <main>
      <div className="container">
        <h1 className='text-center mb-0 text-purple'>Product Finder</h1>
        <ProductSearch productNames={productNames} nameValueSelected={onNameValueSelected} />
      </div>
      <div className="product__container--filter">
        <div className="d-flex justify-between">
          <ProductFilter productTypes={productTypes} typeValueSelected={onTypeValueSelected} />
        </div>
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
        <p className='text-center'> Loading Data...</p>
      }
      {hasError &&
        <p className='text-center'> Sorry, something went wrong.</p>
      }
    </main >
  );
}

export default App;
