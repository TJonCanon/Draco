import React, { useState, useEffect } from 'react'
import { Navbar } from '../Navbar'
import { Productcontainer } from './Productcontainer'
import { collection, query, onSnapshot, getDocs} from "firebase/firestore"
import { db } from '../../config/Config'

export const Allproductpage = (props) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = ()=>{
            const productsArray =[];
            const path = `products-${props.type.toUpperCase()}`;
            // console.log(path);
            
            getDocs(collection(db, path)).then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    productsArray.push({...doc.data(),id:doc.id})
                    console.log(doc.id, " => ", doc.data ());
                })
                setProducts(productsArray)
            }).catch((error) =>{
                console.log(error.message);
            })
        }
        getProducts()
    }, [])
    console.log(props.type)
    return (
        <div className="allproductpage">
            <Navbar />
            <div className="allproductcontainer">
                {products.map((product) => (
                    <Productcontainer 
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
  )
}

