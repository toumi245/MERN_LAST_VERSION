import React ,{useState}from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'
import { NavDropdown } from 'react-bootstrap';
import {logout} from '../actions/userAction'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import './DropDown.css'
import products from './products';
import Form from 'react-bootstrap/Form';

// Inside your component's render method:
<FontAwesomeIcon icon={faAddressBook} />

export default function Header({setSearchName,handleCategoryChange}) {
  const dispatch=useDispatch()
  
  const userLogin=useSelector((state)=>state.userLogin)
  const {userInfo}=userLogin
  const logoutHandler=()=>{
    dispatch(logout())
  }

  

  return (
    
      
    <Navbar collapseOnSelect className='col-nav' expand="lg" bg="primary" variant="dark" style={{ position: "fixed", top: "0", zIndex: "9999", width: "100%" }}>
    <Container>
      <LinkContainer to='/'>
        <Navbar.Brand>Hi-TECH</Navbar.Brand>
      </LinkContainer>
      <LinkContainer to='/'>
        <Navbar.Brand>HOME</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="me-auto">
          <LinkContainer to='/contact'>
            <Nav.Link>
              <FontAwesomeIcon icon={faAddressBook} /> Contact us
            </Nav.Link>
          </LinkContainer>
          <Form className="d-flex" style={{display:"flex",justifyContent:"flex-start" ,width:"500px",marginLeft:'30px'}}>
                  <Form.Control
                    type="search Product"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e)=>setSearchName(e.target.value)}/>
            </Form>
        </Nav>
        
        <Nav className="ml-auto">
          <NavDropdown title="Category List" id="navbarScrollingDropdown" style={{ marginLeft: "15px", marginRight: "15px" }}
                       
                        >
            <NavDropdown.Item eventKey="electronic" onClick={handleCategoryChange}>electronic</NavDropdown.Item>
            <NavDropdown.Item  eventKey="electro-ménager"   onClick={handleCategoryChange}>electro-ménager</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="logiciel"  onClick={handleCategoryChange}>Logiciel</NavDropdown.Item>
          </NavDropdown>
          <LinkContainer to="/cart" style={{ marginLeft: "15px", marginRight: "15px" }}>
            <Nav.Link>
              <i className="fas fa-shopping-cart"></i> Cart
            </Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="username" eventKey={2} style={{ marginLeft: "15px", marginRight: "15px" }}>
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>LogOut</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-user"></i> SignIn
              </Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  
  )
}
