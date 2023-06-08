import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

export default function Product({singleItem}) {


  return (
<Card style={{ display: "flex", flexDirection: 'column', maxWidth: '300px', height: '100%', flexShrink: 0  }}>
  <Link to={`/product/${singleItem._id}`}>
    <Card.Img variant="top" src={singleItem.image} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
  </Link>
  <Card.Body style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <Link to={`/product/${singleItem._id}`} style={{ textDecoration: 'none' }}>
      <Card.Title style={{ fontSize: '1rem', marginBottom: '5px', fontWeight: 'bold' }}>{singleItem.name}</Card.Title>
    </Link>
    <div style={{ display: 'flex', marginBottom: '5px' }}>
      <span style={{ fontWeight: 'bold' }}>Brand:</span>
      <span style={{ marginLeft: '5px' }}>{singleItem.brand}</span>
    </div>
    <div style={{ display: 'flex', marginBottom: '5px' }}>
      <span style={{ fontWeight: 'bold' }}>Category:</span>
      <span style={{ marginLeft: '5px' }}>{singleItem.category}</span>
    </div>
    <div style={{ display: 'flex', marginBottom: '5px' }}>
      <span style={{ fontWeight: 'bold' }}>Price:</span>
      <span style={{ marginLeft: '5px' }}>{singleItem.price}</span>
    </div>
    <Card.Text style={{ marginBottom: '10px' }}>{singleItem.description}</Card.Text>
    <div style={{ marginTop: 'auto' }}>
      <Link to={`/product/${singleItem._id}`}>
        <Button variant="info">See Details</Button>
      </Link>
    </div>
  </Card.Body>
</Card>

  
      
  )
}
