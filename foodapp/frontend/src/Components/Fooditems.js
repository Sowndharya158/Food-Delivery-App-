import Foodcart from "./Foodcart";



export default function Fooditems({mealsExist,addToCart}){

 

    return(
         <>
         <div className="menu"><img src="/menu.png" alt="menu"></img></div>
         {mealsExist.length>0 ? <div className="food-container">

            {mealsExist.map((meal)=>{
                return(<Foodcart key={meal.id} meal={meal} addToCart={addToCart}/>)
            })}
         </div>: <h3 style={{margin:"2rem",textAlign:"center"}
         }> Sorry, Currently No meals available at the restaurant. Please try again Later.</h3>}
        
         
         
        </>
    )
}