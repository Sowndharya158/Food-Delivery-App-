import { useNavigate } from 'react-router-dom'

export default function Header({content,isCart,cartClicked,isinOrders}){
const navigate=useNavigate();
function handleOrderDetails(){
navigate("/pastorders")
}
    function handleHome(){
        navigate("/")
    }
    function handleCart(){
navigate("/cart")
    }
    return(
        <header><div className="header">
            <span style={{display:"flex", gap:"1em"}}><img className="logo" src="/logo.jpg" alt="logo" />
            <h2>{content}</h2></span>
             <><div style={{display:"flex",gap:"1rem"}}>
             <h2 onClick={handleHome} style={{cursor:"pointer",color:"#A06C23",fontSize:"1.5em",marginRight:"1rem",marginTop:"1em"}}>Home <i onClick={handleHome} className="fa-solid fa-house" style={{color:"#A06C23",cursor:"pointer"}}/></h2>
                <h2 onClick={handleCart} style={{cursor:"pointer",color:"#A06C23",fontSize:"1.5em",marginRight:"1rem",marginTop:"1em"}}>Cart <i onClick={handleCart} className="fa fa-shopping-bag" style={{color:"#A06C23",cursor:"pointer"}}/></h2><h2 style={{color:"#A06C23",fontSize:"1.5em",marginRight:"1rem",marginTop:"1em",cursor:"pointer",}} onClick={handleOrderDetails}>Orders <i className="fa-solid fa-truck" style={{color:"#A06C23",cursor:"pointer"}} onClick={handleOrderDetails}/></h2></div></>
        </div></header>
    )
}
