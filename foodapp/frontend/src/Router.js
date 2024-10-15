import React from 'react';
import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
import { CartContextProvider } from './store/CartContext'; // Ensure this import is correct
import App from './App';
import Checkout from './Components/Checkout';
import { useEffect } from 'react';
import OrderSuccess from './Components/OrderSuccess';
import { OrderContextProvider } from './store/OrderContext';
import PastOrders from './Components/PastOrders';
import Cart from './Components/Cart';

function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        // Scroll to the top whenever the route changes
        window.scrollTo(0, 0);
    }, [location]); // Runs whenever the location changes (i.e., route changes)

    return null; // This component does not render anything, just handles the scroll reset
}
export default function AppRouter() {
    
    
    return (
        <Router>
             <ScrollToTop />
             <OrderContextProvider>
            <CartContextProvider>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path="/ordersuccessful" element={<OrderSuccess/>} />
                    <Route path="/pastorders" element={<PastOrders/>}/>
                </Routes>
            </CartContextProvider>
            </OrderContextProvider>
        </Router>
    );
}
