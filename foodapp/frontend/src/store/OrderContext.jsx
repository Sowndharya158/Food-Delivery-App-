import {  createContext, useReducer } from 'react';

const OrderContext=createContext({
    orderDetails:[],
    addOrder:()=>{}
})


function OrderReducer(state,action){
if(action.type==="ADD_ORDER"){
return {...state,orderDetails:[action.item]}
}
return state
}

export function OrderContextProvider({children}){
    const [order,dispatchCartAction]=useReducer(OrderReducer,{orderDetails:[]})

    function addOrder(item){
        dispatchCartAction({type:"ADD_ORDER",item})
    }

    const orderContext={
        orderDetails:order.orderDetails,
        addOrder
    }

    return <OrderContext.Provider value={orderContext}>{children}</OrderContext.Provider>
}

export default OrderContext;