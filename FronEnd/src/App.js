import React, { useState, useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ContactUs from './components/ContactUs';
import OrderScreen from './screens/OrderScreen';
import products from './products'

function App() {
  
  const [productsCard,setProductsCard]=useState(products);
 const [searchName,setSearchName]=useState("");
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleCategoryChange=(event)=>{
    setSelectedCategory(event.target.value)
  }
  

  const categories = Array.from(new Set(products.map(product => product.category))); // Get unique categories


  return (
    <Router>
      <Header onCategoryChange={handleCategoryChange} setSearchName={setSearchName} />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen searchName={searchName}/>} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/order/:id' element={<OrderScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
