import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,  faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
export default function Header({content,handleHome}){
    const [navClicked,setNavClicked]=useState(false)
    const navigate=useNavigate();
    function handleOrderDetails(){
    navigate("/pastorders")}
    function handleCart(){
    navigate("/cart")
    }
    return(
            <header><div className="header1">
            <span style={{display:"flex", gap:"1em"}}><img className="logo" src="/logo.jpg" alt="logo" />
            <h1 style={{marginTop:"2rem"}}>{content}</h1></span>
             <><div style={{display:"flex",gap:"1rem"}}>
            <div className="header-largerscreen" >
            <h1 onClick={handleHome} style={{cursor:"pointer",color:"#A06C23",marginRight:"1rem",marginTop:"1em"}}>Home <i onClick={handleHome} className="fa-solid fa-house" style={{color:"#A06C23",cursor:"pointer"}}/></h1>
            <h1 onClick={handleCart} style={{cursor:"pointer",color:"#A06C23",marginRight:"1rem",marginTop:"1em"}}>Cart <i onClick={handleCart} className="fa fa-shopping-bag" style={{color:"#A06C23",cursor:"pointer"}}/></h1><h1 style={{color:"#A06C23",marginRight:"1rem",marginTop:"1em",cursor:"pointer",}} onClick={handleOrderDetails}>Orders <i className="fa-solid fa-truck" style={{color:"#A06C23",cursor:"pointer"}} onClick={handleOrderDetails}/></h1></div>
            <div className='header-smallscreen'>{!navClicked? <h1  style={{cursor:"pointer",color:"#A06C23",marginRight:"1rem",marginTop:"1em"}} onClick={()=>setNavClicked(true)}><FontAwesomeIcon icon={faBars}/></h1 >:<h1 style={{cursor:"pointer",color:"#A06C23",marginRight:"1rem",marginTop:"1em"}} onClick={()=>setNavClicked(false)}><FontAwesomeIcon icon={faXmark} /></h1>}</div>
            </div>
      
                </>  
        </div>
        {navClicked && <div style={{display:"flex",flexDirection:"column",gap:"1rem",marginBottom:"0.3rem",textAlign:"center"}}>
             <h1 onClick={handleHome} style={{cursor:"pointer",color:"#A06C23",marginRight:"1rem",marginTop:"1em",textDecoration:"underline"}}>Home <i onClick={handleHome} className="fa-solid fa-house" style={{color:"#A06C23",cursor:"pointer"}}/></h1>
                <h1 onClick={handleCart} style={{cursor:"pointer",color:"#A06C23",marginRight:"1rem",marginTop:"1em",textDecoration:"underline"}}>Cart <i onClick={handleCart} className="fa fa-shopping-bag" style={{color:"#A06C23",cursor:"pointer"}}/></h1>
                
                <h1 style={{color:"#A06C23",marginRight:"1rem",marginTop:"1em",cursor:"pointer",marginBottom:"1rem",textDecoration:"underline"}} onClick={handleOrderDetails}>Orders <i className="fa-solid fa-truck" style={{color:"#A06C23",cursor:"pointer"}} onClick={handleOrderDetails}/></h1>
                </div>}</header>
    )
}