import { useEffect, useState } from 'react';
import Foodcart from "./Foodcart";



export default function Fooditems({mealsExist,addToCart}){

    const [currentPage,setCurrentPage]=useState(1);
    const [foodPerPage,setFoodPerPage]=useState(8);
    const pages=[]
    const lastItemIndex=currentPage*foodPerPage;
    const firstItemIndex=lastItemIndex-foodPerPage;
    console.log(lastItemIndex,firstItemIndex)
    const currentItems=mealsExist.slice(firstItemIndex,lastItemIndex);
    const totalPages=Math.ceil(mealsExist.length/foodPerPage)
    for(let i=1;i<=totalPages;i++){
        pages.push(i)
    }
    function handleCurrentPage(page){
        setCurrentPage(page)
        window.scrollTo(0,0)
    }

    function handlePreviousPage(page){
        setCurrentPage((page)=>page-1)
        window.scrollTo(0,0)
    }
    function handleNextPage(){
        setCurrentPage((page)=>page+1)
        window.scrollTo(0,0)
    }
    return(
         <>
         <div className="menu"><img src="/menu.png" alt="menu"></img></div>
         {currentItems.length>0 ? <><div className="food-container">

            {currentItems.map((meal)=>{
                return(<Foodcart key={meal.id} meal={meal} addToCart={addToCart}/>)
            })}
         </div>
         {/*Pagination*/}
         <div className='pagination-section'>
            {currentPage>1 && <button className='pagination-button1' onClick={handlePreviousPage}>Previous Page</button>}
            {pages.map((page)=>{
                return(<button style={{backgroundColor:currentPage===page?"#E5B64B":''}} className='pagination-buttons'onClick={()=>handleCurrentPage(page)}>{page}</button>)
            }

            )}
            
            {currentPage<totalPages && <button className='pagination-button1' onClick={handleNextPage}>Next Page</button>}

         </div></>
         
         
         
         : <h3 style={{margin:"2rem",textAlign:"center"}}> Sorry, Currently No meals available at the restaurant. Please try again Later.</h3>}
        
         
         
        </>
    )
}