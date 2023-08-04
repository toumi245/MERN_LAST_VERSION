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
  const [ price, setPrice ] = useState(1000);
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
        (selectedCategory === '' || product.category === selectedCategory)&& parseInt(product.price,10) <= price
    );

  setFilteredProducts(filteredProducts);
  }, [products, searchName, selectedCategory,price]);


  // Triggered when the value gets updated while scrolling the slider:
  const handleInput = (e)=>{
    setPrice( e.target.value );
  }

  return (
    <div >
    
      <Carrousel/>
      <div style={{display:"flex",margin:"10px",padding:"10px"}}>
        <div style={{display:"flex",flexDirection:"column",justifyContent:'center',marginRight:"20px"}}>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Logiciel">Logiciel</option>
          <option value="Electronics">Electronics</option>
        </select>
        </div>
      <div>
      <h1 style={{color:'#1E90FF',fontSize:'30px'}}>Price: { price }</h1>
      <input type="range" min="0" max="9000" onInput={ handleInput } />
      </div>
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
