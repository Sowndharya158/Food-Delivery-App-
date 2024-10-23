import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderContext from '../store/OrderContext';
import Header from './Header';

export default function PastOrders() {
 
  const navigate = useNavigate();
  const orderCtx=useContext(OrderContext);
  const orderDetails=orderCtx.orderDetails;

  function handleHomeNavigation() {
    navigate("/");
  }

  // Helper function to calculate total amount for each order
  function calculateTotalAmount(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }
  console.log(orderCtx.orderDetails);

  return (
    <>
     <Header content="Order Details" handleHome={handleHomeNavigation}/>

      {orderDetails.length < 1 ? (
        <div className='checkout-container'>
          <div className='emptycart'>
            <img src="/EmptyCart.png" alt="cart-image" />
            <h3 style={{ textAlign: "center" }}><strong>You don't have any orders placed</strong></h3>
            <h3 style={{ fontWeight: "lighter" }}>Looks like you have not placed any orders yet. Go ahead & explore the food available.</h3>
            <button className='home' style={{ cursor: "pointer" }} onClick={handleHomeNavigation}>Go back to home</button>
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", margin: "2rem auto" }}>
          <div className='products' style={{ width: "80%", margin: "3rem auto" }}>
            <h2 style={{ margin: "2rem", textAlign: "center" }}>Past Orders ({orderDetails.length})</h2>
            {orderDetails.map((order, index) => (
              <div key={index} style={{ margin: "3rem auto", width: "80%" }}>
                <h3>Order #{index + 1}</h3>
                <table style={{ width: "80%", borderCollapse: "collapse", marginBottom: "2rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ccc" }}>
                    <th style={{ padding: "8px", textAlign: "left" }}>Product</th>
                      <th style={{ padding: "8px", textAlign: "left" }}>Item</th>
                      <th style={{ padding: "8px", textAlign: "left" }}>Quantity</th>
                      <th style={{ padding: "8px", textAlign: "left" }}>Price</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((product, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "8px" }}>
                        <img src={product.image} alt="test" width="80px" height="80px"/><br />
                          <span style={{ fontWeight: "lighter" }}></span>
                        </td>
                        <td style={{ padding: "8px" }}>{product.description}</td>
                        <td style={{ padding: "8px" }}>{product.quantity}</td>
                        <td style={{ padding: "8px" }}>${product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Calculate total for this order */}
                <h4 style={{ width: "70%", textAlign: "right", fontWeight: "bold" }}>
                  Total Amount: ${calculateTotalAmount(order.cartItems)}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
