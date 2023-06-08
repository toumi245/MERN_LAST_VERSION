import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/product';
import Carrousel from '../components/Carrousel';

const HomeScreen = ({ searchName }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchName.toLowerCase().trim()) &&
        (selectedCategory === '' || product.category === selectedCategory)
    );

    setFilteredProducts(filteredProducts);
  }, [products, searchName, selectedCategory]);

  return (
    <div >
    
      <Carrousel/>
      <div style={{margin:"10px",padding:"10px"}}>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Logiciel">Logiciel</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>

      

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div >
        <Row>
          {filteredProducts.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Product singleItem={product} />
            </Col>
          ))}
        </Row>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
