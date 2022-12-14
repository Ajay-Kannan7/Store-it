import { Link,NavLink } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons';
import "./home.css"
function HomePage(props){
    //navbar icon code
    let [iconValue,handleIcon]=useState({
        initialValue:faBars
    })
    let data;
    if(props.data===null){
        return
    }
    else{
        data=props.data;
    }
  
  let handleClick=()=>{
    let navBox=document.querySelector(".navigation nav")
    navBox.classList.toggle("visible")
    handleIcon(()=>{
      if(iconValue.initialValue===faBars){
        return{
          initialValue:faXmark
        }
      }else{
        return{
          initialValue:faBars
        }
      }
    })
  }
    //cart data tracker
    let cartElements=0;
    let cartNumber=0;
    // let cartSize=state.cartData.length;
    // console.log(cartSize)
    // let cartLocalStorage=localStorage.setItem("cart-size",JSON.stringify(cartSize))
    let cartItemsPresent=localStorage.getItem("cart-filled");
    console.log(cartItemsPresent)
    if(cartItemsPresent>0){
      let cartProductData=JSON.parse(localStorage.getItem("cart-products"))
      console.log(cartProductData)
      if(cartProductData.length>0){
        for(let i=0;i<cartProductData.length;i++){
          cartElements+=cartProductData[i].rate
          cartNumber+=parseInt(cartProductData[i].quantity)
        }
      }
      else{
          cartNumber=0;
      }
    }
    return(
        <div className="main-container">
            <div className="navigation">
                <h1>Store-it</h1>
                <FontAwesomeIcon icon={iconValue.initialValue} onClick={handleClick} className="hamburger-icon"/>
                <nav>
                <NavLink className="navLinks" to="/">Home</NavLink>
                <NavLink className="navLinks" to="/about">About</NavLink>
                <NavLink className="navLinks" to="/cart">Cart({cartNumber})</NavLink>
                <NavLink className="navLinks drop" onClick={()=>{
                        localStorage.removeItem("isLoggedIn");
                        window.location.reload();
                  }}>Logout</NavLink>
                </nav>
            </div>
            <div className="card-container">
                {data.map(elements=>(
                    <div className="cards">
                        <img src={elements.productImage} alt="images"></img>
                        <div className="cards-header">
                            <h2><Link className="card-link" to={`/products/${elements.productName}`}>{elements.productName}</Link></h2>
                            <p>${elements.productPrice}</p>
                        </div>
                        <p className="cards-category">Category: {elements.productCat}</p>
                        <button className="cards-button"><Link className="link" to={`/products/${elements.productName}`}>View</Link></button>
                    </div>
                ))} 
            </div>
        </div>
    )
}

export default HomePage