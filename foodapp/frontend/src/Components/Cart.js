import Header from "./Header";
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CartContext from '../store/CartContext';
import { useContext } from 'react';
import EmptyCart from './EmptyCart';

export default function Cart() {

    const cartCtx=useContext(CartContext);
    const cartitems=cartCtx.items

    console.log("Cart context holds - ",cartCtx.items)
    const navigate=useNavigate()

    function handlecheckout(){
        navigate("/checkout")
    }

    console.log("Cart Items:", cartitems); 

    const Cart_total=cartCtx.items.reduce((total,item)=>total+(item.price*item.quantity),0)

    const platformfee=1;
    const deliveryfee=4;

    function handleAddItem(item){
        cartCtx.addItem(item)
    }

    function handleRemoveItem(id){

        cartCtx.removeItem(id)
    }

    function handleDeleteItem(id){
        cartCtx.deleteItem(id)
    }
    return (
        <>
           
            {cartitems.length<1?<><EmptyCart/></>:
             <><Header content="Cart Details" /><div className="container">
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
                                <div className='itemmodification'>
                                    <div className='cartmanipulation'>
                                        <button className='button-style' onClick={()=>handleRemoveItem(item.id)}>-</button>
                                        <input className='small-input' value={item.quantity} />
                                        <button className='button-style' onClick={()=>handleAddItem(item)}>+</button>
                                    </div>
                                    <div className='deleteicon'><FaTrash onClick={()=>handleDeleteItem(item.id)}/></div>
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
                    <div className='checkoutbutton'>
                            <button onClick={handlecheckout} ><h3 style={{margin:0,padding:0}}>Proceed to checkout</h3></button>
                        </div>
                </div>
            </div></>}
        </>
    );
}
