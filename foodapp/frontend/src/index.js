import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './Router';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


const initialOptions = {
  "client-id": "AaQOkxbb12OJ22CionB0-Zz-vLmabXIvJgydpNk_hBZob6sz0p8EWxFbMelzhWmHeCMQtBMyeiY9LXPa",
  currency: "USD",
  intent: "capture",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
   <PayPalScriptProvider options={initialOptions}>
    <AppRouter/>
   </PayPalScriptProvider>
  </React.StrictMode>
);


