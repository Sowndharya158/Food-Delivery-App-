import React, { useEffect, useState,Suspense } from "react";
import Header from "./Components/Header";
import {useNavigate } from 'react-router-dom';

const Fooditems=React.lazy(()=>import("./Components/Fooditems"))
function App() {
   const [meals,setMeals]=useState([]);
   const [rerenderkey,setReRenderKey]=useState(0)

  

   const navigate=useNavigate();

   function handleCartClick(){
    navigate("/cart");
   }
   useEffect(()=>{
    async function getMeals(){
      try{
        const response=await fetch(`${process.env.REACT_APP_SERVER_URL}/meals`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
      const resdata= await response.json();
      setMeals(resdata)
      }
      catch(error){
        console.log("An error occurred",error);
        setMeals([]);
      }
      
  
    }
    getMeals();

    
   },[])

   function handleHome(){
    setReRenderKey((key)=>key+1)
    navigate("/")
}
  
const amount='1'

  return (
  <>

   <Header handleHome={handleHome} content="Your Favorite Dishes, Delivered" isCart="false" cartClicked={handleCartClick} />
   <Suspense fallback={<div>Loading food details...</div>}>
   <Fooditems mealsExist={meals} key={rerenderkey}/>
   </Suspense>
   
    
    
    
    </>
  );
}

export default App;
