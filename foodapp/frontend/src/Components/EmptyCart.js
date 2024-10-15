import { useNavigate } from 'react-router-dom'
import Header from './Header';
export default function EmptyCart(){
const navigate=useNavigate();
function handleHomeNavigation(){
    navigate("/")
}
return(
<>
<Header isCart="false" content="Cart Details"/>
<div className='checkout-container'><div className='emptycart'><img src="./EmptyCart.png" alt="emptycart"/><h2 style={{textAlign:"center"}}><strong>Your Cart is empty</strong></h2><h3 style={{fontWeight:"lighter"}}>Looks like you have not added anything to the cart yet. Go ahead & explore the food available.</h3><button className='home' style={{cursor:"pointer"}} onClick={handleHomeNavigation}>Go back to explore food</button></div></div></>)}