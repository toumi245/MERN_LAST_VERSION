import React ,{ useEffect ,useState} from 'react'
import {Link, useNavigate, useParams}from 'react-router-dom'
import axios from 'axios'
import {PayPalButton}from 'react-paypal-button-v2'
import { Button,Row,Col,ListGroup,Image,Card } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {payOrder,getOrderDetails} from '../actions/orderActions.js'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
export default function OrderScreen() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {id}=useParams()
const orderId=id
    const [sdkReady,setSdkReady]=useState(false)
    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading,error}=orderDetails
    // orderPay
    const orderPay=useSelector((state)=>state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay

    //calculate prices
  const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
  }
  if (order && order.orderItems) {
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0));
  }  
    useEffect(()=>{
        const addPaypalScript=async()=>{
            const {data: clientId}=await axios.get('https://backend2-mnfa.onrender.com/api/config/paypal')
            const script=document.createElement('script')
            script.type='text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload=()=>{
            setSdkReady(true)
            }
        }
        if(!order||successPay){
        dispatch({type:ORDER_PAY_RESET})
        dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid){
        if(window.paypal){
            // running the sdk javascript
            addPaypalScript()
        }else{
            // some condition
            setSdkReady(true)

        }
    }
    },[dispatch,orderId,successPay])
const successPaymentHandler=(paymentResult)=>{
    console.log(paymentResult)
}
    return (
    loading ?(
        <Loader/>
    ):error ?(<Message variant='danger'>{error}</Message>
    ):
    <>
    <h1>Order{order._id} </h1>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>shipping</h2>
                    <p>
                        <strong>Name :</strong>{order.user.name}
                    </p>
                    <p>
                        <strong>Email :</strong>{' '}
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p>
  <strong>Address:</strong>
  {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
</p>
{order.isDelivered ? (
    <Message variant='success'>Delivered at{order.DeliveredAt}</Message>
):    <Message variant='danger'>not Delivered {order.DeliveredAt}</Message>
}
                </ListGroup.Item>
              
                <ListGroup.Item>
                <p>
                <h2>Payment Method</h2>
                <strong>Method :</strong>
                {order.paymentMethod}
                </p>
                {order.isPaid ? (
    <Message variant='success'>Delivered at{order.DeliveredAt}</Message>
):    <Message variant='danger'>not Delivered {order.DeliveredAt}</Message>
}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ?(
                        <Message>YOUR cart is empty</Message>
                    ):(
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                        <Image
                                        src={item.image}
                                        alt={item.name}
                                        fluid
                                         rounded/>


                                        </Col>
                                        <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        </Col>
                                        <Col md={4}>
                                        {parseInt(item.qty)}x ${parseInt(item.price)}=${parseInt(item.qty) * parseInt(item.price)}

                                        
                                        </Col>
                                        
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>

        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>order summary </h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {/* {loadingPay} */}
                    {!order.isPaid && (
                        <ListGroup.Item>
                        <Row>
                        {loadingPay && <Loader/>}
                        {!sdkReady ? (
                            <Loader/>
                        ):(<PayPalButton amount={order.totalPrice}
                        onSuccess={successPaymentHandler}/>)}
                        </Row>
                    </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  )
}
