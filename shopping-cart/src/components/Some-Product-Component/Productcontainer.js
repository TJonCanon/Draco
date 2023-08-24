import React from 'react'
import { Link } from 'react-router-dom'

export const Productcontainer = (product) => {
    let p = product.product
    console.log(p)



  return (
    <div className='product-container'>
        <img src={p.productimage} />
        <div className='product-details'>
            <a href={`/product/${p.producttype}/${p.id}`}>
                <button className='producttitle'>{p.producttitle}</button>
            </a>
            <div className='price-container'>
                <p className='mrp'>$<p>{p.price}</p></p>
            </div>
            <div>
            </div>
        </div>
    </div>
  )
}
