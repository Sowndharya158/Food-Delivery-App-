import React from "react";
import {FaStar,FaStarHalfAlt} from "react-icons/fa";


const Rating= React.memo(({rating})=>{


    const totalstars=5;

    const fullstars=Math.floor(rating);



    //check if  half stars are present

    const halfstars=rating-fullstars>=0.5;


    return(<div className="stars">
        {[...Array(totalstars)].map((_,index)=>{
            if(index<fullstars)//Full stars
            {
                return  <FaStar key={index} style={{color:"#d4af37"}}/>
            }
            else if(halfstars && index===fullstars){//Has half star
                return  <FaStarHalfAlt key={index} style={{color:"#d4af37"}}/>
            }
            else{
                return <FaStar key={index} style={{color:"#ffffff"}}/>
            }        

        })}
    </div>)

})

export default Rating