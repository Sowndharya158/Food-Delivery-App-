import Header from "./Header";
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CartContext from '../store/CartContext';
import { useContext } from 'react';
import EmptyCart from './EmptyCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import OrderContext from '../store/OrderContext';

export default function OrderSuccess() {

    const cartCtx=useContext(CartContext);
    const orderCtx=useContext(OrderContext);
    const setCartItems=cartCtx.EmptyCart
    const cartitems=cartCtx.items
const navigate=useNavigate()
    console.log("Cart context holds - ",cartCtx.items)
    function handleHomeNavigationAfterOrder(){
        setCartItems()
navigate("/")
    }
   

    console.log("Cart Items:", cartitems); 

    const Cart_total=cartCtx.items.reduce((total,item)=>total+(item.price*item.quantity),0)

    const platformfee=1;
    const deliveryfee=4;

    console.log(orderCtx.orderDetails)
    return (
        <>
            <Header content="Order Details"  />
            {cartitems.length<1?<EmptyCart/>:
            <><div className='checkout-container'><div style={{display:"flex",margin:"1rem auto",width:"100%",alignItems:"center",justifyContent:"center",gap:"10px"}}><FontAwesomeIcon icon={faSquareCheck} size='2xl' style={{color:"#4BB543"}}/><h2 style={{textAlign:"center"}}>Your order has been placed successfully</h2></div>
            <div className="container">
                <h2 style={{ color: "#A06C23", textAlign: "center" }}>Cart ({cartitems.length} Items)</h2>
                <div className="orderdetails">
                    {cartitems.length > 0 && cartitems.map((item) => (<>
                        <div className="cart-item" key={item.name}>
                            <div className='image'><img src={item.image} alt={item.name} /></div>
                            <div className='cart-info'>
                                <div className='iteminfo'>
                                    <h3>{item.name}</h3>
                                    <h3>{item.price*item.quantity}</h3>
                                </div>
                            </div>
                            
                        </div>
                        <hr className='hr-style' /></>
                       
                    ))}
                    
                </div>

                <div className='pricesection'>
                    <div className='heading'>
                        <h3 style={{ textAlign: "center" }}>Price Details (1 item)</h3>
                    </div>
                    <div className='pricedetails'>
                        <div className='itemtotal'>
                            <h3>Item Total:</h3>
                            <h3>${Cart_total.toFixed(2)}</h3>
                        </div>
                        <div className='platformfee'>
                            <h3>Platform Fee:</h3>
                            <h3>${platformfee}</h3>
                        </div>
                        <div className='deliveryfee'>
                            <h3>Delivery Fee:</h3>
                            <h3>${deliveryfee}</h3>
                        </div>
                        <div className='total'>
                            <h2><b>Sub Total:</b></h2>
                            <h2><b>${(Cart_total+deliveryfee+platformfee).toFixed(2)}</b></h2>
                        </div>
                        
                    </div>
                </div>
            </div></div></>}
        </>
    );
}
