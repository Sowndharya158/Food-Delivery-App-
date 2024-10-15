import { useEffect, useState } from "react";
import Fooditems from "./Components/Fooditems";
import Header from "./Components/Header";
import {useNavigate } from 'react-router-dom';

function App() {
   const [meals,setMeals]=useState([]);
   

  

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


  
const amount='1'

  return (
  <>

   <Header content="Your Favorite Dishes, Delivered" isCart="false" cartClicked={handleCartClick} />
    <Fooditems mealsExist={meals}/>
    
    
    </>
  );
}

export default App;
