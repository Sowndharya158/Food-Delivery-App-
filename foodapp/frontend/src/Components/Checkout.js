import React, { useContext, useState } from 'react';
import Header from './Header';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import CartContext from '../store/CartContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import OrderContext from '../store/OrderContext';

export default function Checkout() {


    const cartctx=useContext(CartContext);
    const orderCtx=useContext(OrderContext);

    const [isError,setError]=useState("")
    const cartItems=cartctx.items;
    
    const platformfee=1;
    const deliveryfee=4;
    const Cart_total=cartctx.items.reduce((total,item)=>total+(item.price*item.quantity),0)
    const payment_total=Cart_total+deliveryfee+platformfee;
const [deliveryInfo,setDeliveryInfo]=useState({
    name:'',
    phone:"",
    email:"",
    streetaddress:"",
    aptsuite:"",
    city:"",
    state:"",
    pincode:""


})
    const amount = '155'; // Total amount for the order

    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
const navigate=useNavigate()
    const handlePaymentSuccess = () => {
        if(deliveryInfo.name && deliveryInfo.phone && deliveryInfo.aptsuite && deliveryInfo.city && deliveryInfo.email && deliveryInfo.pincode && deliveryInfo.state&& deliveryInfo.streetaddress)
        {
            setError("")
            setIsPaymentSuccess(true);
        }
            else{
setError("Please fill all the details to proceed");
window.scrollTo(0,0)
            }
    };

    
        function handleInputChange(e){
            const {name,value}=e.target;
            const updatedinfo = { ...deliveryInfo, [name]: value };
            setDeliveryInfo(updatedinfo)
            
        }

        const onCreateOrder = (data,actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: payment_total,
                        },
                    },
                ],
            });
        }
    
        const onApproveOrder = (data,actions) => {
            return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
              
              alert(`Transaction completed by ${name}`);
              orderCtx.addOrder({cartItems:cartItems,deliverydetails:deliveryInfo});
              console.log(orderCtx.orderDetails)
              navigate("/ordersuccessful")
              
            }).catch((error)=>{
                console.error("Payment failed", error);
                alert("Payment could not be processed. Please try again.");
            })
          }

          function handleCOD(){
            if(deliveryInfo.name && deliveryInfo.phone && deliveryInfo.aptsuite && deliveryInfo.city && deliveryInfo.email && deliveryInfo.pincode && deliveryInfo.state&& deliveryInfo.streetaddress)
                {
                    setError("")
                    orderCtx.addOrder({cartItems:cartItems,deliverydetails:deliveryInfo});
                    console.log(orderCtx.orderDetails)
                    navigate("/ordersuccessful")
                }
                    else{
        setError("Please fill all the details to proceed")
                    }
          }
    


function saveAddressState(e){
e.preventDefault();

}


    return (
        <>
            <Header content="Secure Checkout" />
            <main className='checkout'>
                <section className='checkout-info'>
                    {isError && <h5 style={{color:"red",fontSize:"1.4rem",fontWeight:"normal"}}>{isError}</h5>}
                    <form id='checkout-form'>
                        {/* Contact Information */}
                        <h2 style={{ margin: "1rem 0", fontWeight: "600" }}>Contact Information</h2>
                        <div className='contact-info'>
                            <label htmlFor='name' required>Name</label>
                            <input type='text' id='name' name='name' onChange={handleInputChange} />

                            <label htmlFor='phone' required>Phone Number</label>
                            <input type='text' id='phone' name='phone' pattern='[0-9]{10}' onChange={handleInputChange}/>

                            <label htmlFor='email' required>Email Id</label>
                            <input type='email' id='email' name='email' onChange={handleInputChange} />

                            
                        </div>

                        {/* Delivery Details */}
                        <h2 style={{ margin: "1rem 0", fontWeight: "600" }}>Delivery Details</h2>
                        <div className='shipping-info'>
                            <label htmlFor='streetaddress' required>Street Address</label>
                            <input type='text' id='streetaddress' name='streetaddress' required onChange={handleInputChange}/>

                            <label htmlFor='aptsuite'required >Apartment, suite, etc.</label>
                            <input type='text' id='aptsuite' name='aptsuite' required onChange={handleInputChange}/>

                            <label htmlFor='city' required>City</label>
                            <input type='text' id='city' name='city' required onChange={handleInputChange}/>

                            <label htmlFor='state' required>State</label>
                            <input type='text' id='state' name='state' required onChange={handleInputChange}/>

                            <label htmlFor='pincode' required>Pincode</label>
                            <input type='text' pattern='[0-9]{6}' id='pincode' name='pincode' required onChange={handleInputChange}/>
                        </div>
                        <div className='checkoutbutton' ><button type='submit' style={{width:"100%",backgroundColor:"#134074",color:"#fff"}} onClick={(e)=>saveAddressState(e)}>Save Address Details</button></div>
                    </form>
                </section>

                <section className='cart-section'>
                    <div className="container">
                        <h2 style={{ color: "#A06C23", textAlign: "center" }}>Order Summary</h2>
                        <div className="orderdetails">
                            {cartItems.length > 0 && cartItems.map(item => (
                                <div className="order-item" key={item.id}>
                                    <div className='image'><img src={item.image} alt={item.name} /></div>
                                    <div className='order-info'>
                                        <div className='order-iteminfo'>
                                            <h3>{item.name}</h3>
                                            <h3>{item.price*item.quantity}</h3>
                                            <h3>Qty: {item.quantity}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='pricesection'>
                            <div className='heading'>
                                <h3 style={{ textAlign: "center" }}>Price Details</h3>
                            </div>
                            <div className='pricedetails'>
                                <div className='itemtotal'>
                                    <h3>Item Total:</h3>
                                    <h3>${Cart_total.toFixed(2)}</h3>
                                </div>
                                <div className='platformfee'>
                            <h3>Platform Fee:</h3>
                            <h3>${cartItems.length>0?platformfee:0}</h3>
                        </div>
                        <div className='deliveryfee'>
                            <h3>Delivery Fee:</h3>
                            <h3>${cartItems.length>0?deliveryfee:0}</h3>
                        </div>
                        <div className='total'>
                            <h2><b>Sub Total:</b></h2>
                            <h2><b>${(Cart_total+deliveryfee+platformfee).toFixed(2)}</b></h2>
                        </div>
                            </div>
                            <div className='checkoutbutton'>
                               <button onClick={handlePaymentSuccess}>Proceed to Payment</button>
                            </div>
                            {isPaymentSuccess && 
                            <><div className='checkoutbutton' ><button style={{width:"100%",backgroundColor:"#134074",color:"#fff"}} onClick={handleCOD}>Cash on Delivery <FontAwesomeIcon size="lg" icon={faShippingFast}></FontAwesomeIcon></button>
                            </div><PayPalButtons 
          style={{ layout: "vertical",width:"100%",margin:"1rem" }}
          createOrder={(data, actions) => onCreateOrder(data, actions)}
          onApprove={(data, actions) => onApproveOrder(data, actions)}
        /></>}
                        </div>
                    </div>
                </section>
            </main>

            
        </>
    );
}
