import React, { useState, useEffect } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from "../config/Config"

export const CartCard = (itemdata) => {
    let p = itemdata.itemdata.product.price


    const [prodquantity, setProdQuantity] = useState(itemdata.itemdata.quantity);
    const increasequantity = () => {
        setProdQuantity(prodquantity + 1)
    }
    const decreasequantity = () => {
        if (prodquantity >= 1){
            setProdQuantity(prodquantity - 1)
        }
    }

    const deletecartitem = () => {

    }

    return (
    <div className='cart-prod-container'>
        <div className='card-prod-imgtitle'>
            <div className='prod-image'><img src={itemdata.itemdata.product.productimage}/></div>
            <div className='prod-title'>{itemdata.itemdata.product.producttitle}</div>
        </div>
        <div className='prodquantity-div'>
            <button onClick={increasequantity}>+</button>
            <p>{prodquantity}</p>
            <button onClick={decreasequantity}>-</button>
        </div>
        <div className='prodprice'>$(price)</div>
        <button className="deletebtn" onClick={deletecartitem}>
            <img src='../images/delete.png'/>
        </button>
    </div>
  )
}


