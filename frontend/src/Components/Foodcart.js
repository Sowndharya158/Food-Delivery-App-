import { useEffect, useState } from "react"
import Rating from "./Rating";
import PropTypes from "prop-types";
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { useMemo } from 'react';


const Foodcart=({meal})=>{

    const [alreadyAdded,setAlreadyAdded]=useState(false)
    const cartCtx=useContext(CartContext)
    const [quantity,setQuantity]=useState(1)


    // Memoize to avoid unnecessary updates
    const memoizedCartItem = useMemo(() => {
        const existingItemIndex = cartCtx.items.findIndex((item) => item.id === meal.id);
        return existingItemIndex > -1 ? cartCtx.items[existingItemIndex] : null;
    }, [meal.id, cartCtx.items]);

    // Update states based on memoized value
    useEffect(() => {
        if (memoizedCartItem) {
            setAlreadyAdded(true);
            setQuantity(memoizedCartItem.quantity);
        } else {
            setAlreadyAdded(false);
            setQuantity(1);
        }
    }, [memoizedCartItem]);  // Only run effect when memoizedCartItem changes

    

    

    function handleAddMealToCart(){

cartCtx.addItem(meal)
    }

    function handleRemoveCartItem(){
        cartCtx.removeItem(meal.id)
    }

    
    console.log('Meal:', meal, 'Already Added:', alreadyAdded, 'Quantity:', quantity);
   
    return(
    <><div className="food-card">
        <div className="food-img"><img src={meal.image} alt="food"  loading="lazy"/></div>
        <h3 className='food-name'>{meal.name}</h3>
        <Rating rating="4"/>
        <h3 className='food-price'>${meal.price}</h3>
       {!alreadyAdded && <button className="addtocart" onClick={handleAddMealToCart} >Add to Cart</button>}
       {alreadyAdded && <div className="qty"><button className="button-style" onClick={handleRemoveCartItem} >-</button><h3>{quantity}</h3><button className="button-style" onClick={handleAddMealToCart}>+</button></div>}
        <p className="food-desc">{meal.description}</p>
    </div></>)
}



export default Foodcart;