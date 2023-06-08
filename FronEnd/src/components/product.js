import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

export default function Product({singleItem,category,product}) {


  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center' ,width:'25'}} >
      
        <Card  style={{ flex: '0 0 20rem', margin: '1rem', maxWidth: '25rem' }} >
            <Link to={`/product/${singleItem._id}`}>
      <Card.Img variant="top" src={singleItem.image} style={{width:'250px',height:"200px"}} />
      </Link>
      <Card.Body >
      <Link to={`/product/${singleItem._id}`}  style={{ textDecoration: 'none'}}>
        <Card.Text style={{ fontSize: '1rem' }}>{singleItem.name}   </Card.Text>
        </Link>
        <Card.Text>
            <Rating 
             value={singleItem.rating}
             text={singleItem.numReviews}
             color='yellow'/>
        </Card.Text>
        
          <Card.Text style={{width:'286px',height:"96px"}}>{singleItem.description}   </Card.Text>
          
        <Card.Text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word',padding:"10px" }}>{singleItem.brand}   </Card.Text>
        <Card.Text>{singleItem.category}   </Card.Text>
        <Card.Text>{singleItem.price}   </Card.Text>
        <Link to={`/product/${singleItem._id}`}>
        <Button variant="info">see Details</Button>{' '}
        </Link>
      </Card.Body>
    </Card>
    </div>
  )
}
