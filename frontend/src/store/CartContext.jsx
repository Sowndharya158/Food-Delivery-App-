import {  createContext, useReducer} from 'react'



const CartContext=createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
    checkItem:(id)=>{},
    deleteItem:(id)=>{},
    EmptyCart:()=>{}
})

function cartReducer(state,action){

    if(action.type==='ADD_ITEM'){
        // update the state to add a meal item
       
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.item.id)

        const updatedItems=[...state.items]
        if(existingCartItemIndex>-1){
            const existingItem=state.items[existingCartItemIndex]
            const updatedItem={
                ...existingItem,quantity:existingItem.quantity+1
            }
            updatedItems[existingCartItemIndex]=updatedItem;

        }
        else{
            updatedItems.push({...action.item,quantity:1})
        }
return {...state,items:updatedItems}

    }

    if(action.type==='REMOVE_ITEM'){
        // remove an item from the state

        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.id)
        const updatedItems=[...state.items];

        const existingcartItem=state.items[existingCartItemIndex]
        if(existingcartItem.quantity===1){
            
            updatedItems.splice(existingCartItemIndex,1)
        }
        else{
            const updatedItem={...existingcartItem,quantity:existingcartItem.quantity-1}
            updatedItems[existingCartItemIndex]=updatedItem
        }
        return {...state,items:updatedItems}


    }

    if(action.type==='DELETE_ITEM'){
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.id)
        const updatedItems=[...state.items];
        updatedItems.splice(existingCartItemIndex,1)
        return {...state,items:updatedItems}

    }
    if(action.type==='EMPTY_CART'){
        return {...state,items:[]}
    }

    
    return state

}

export function CartContextProvider({children}){


    const [cart,dispatchCartAction]=useReducer(cartReducer,{items:[]});
   
    function addItem(item){
        dispatchCartAction({type:'ADD_ITEM',item})

    }

    function removeItem(id){
        dispatchCartAction({type:'REMOVE_ITEM',id})

    }

    function deleteItem(id){
dispatchCartAction({type:"DELETE_ITEM",id})
    }

    function EmptyCart(){
        dispatchCartAction({type:"EMPTY_CART"})
    }

    const cartContext={
        items:cart.items,
        addItem,
        removeItem,
        deleteItem,
        EmptyCart
    }

console.log(cartContext)

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}


export default CartContext;


