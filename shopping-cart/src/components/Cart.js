import React, { useState, useEffect } from 'react'
import { Navbar }  from './Navbar'
import { auth, db } from '../config/Config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { CartCard } from './CartCard'

export const Cart = () => {
    function GetCurrentUser() {
        const [user, setUser] = useState('')
        const userCollectionRef = collection(db, "users")
        useEffect(() => {
            auth.onAuthStateChanged(userlogged=>{
                if(userlogged){
                    const getUsers = async ()=>{
                        const q = query(collection(db,"users"), where("uid", "==", userlogged.uid))
                        // console.log(q)
                        const data = await getDocs(q);
                        setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
                    }
                    getUsers();
                }
                else{
                    setUser(null)
                }
            })
        },[])
        return user
    }
    const loggeduser = GetCurrentUser();
    const [cartdata, setcartdata] = useState([]);
    if (loggeduser) {
        const getcartdata = async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`
            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    cartArray.push({...doc.data(), id: doc.id})
                });
                setcartdata(cartArray)
            }).catch('Error error error')
        }
        getcartdata()
    }

    console.log('test')

    return (
        <div>
            <Navbar />

            {cartdata ? 
                <div>
                    <div className='cart-head'>Your Cart Items</div>
                    <div className='allcartitems'>
                        {cartdata.map((item)=> {
                            <CartCard 
                                key={item.id} 
                                itemdata={item}
                            />
                        })}
                    </div>
                </div> 
                : <p>Your cart is empty</p>}
        </div>
    )
}


