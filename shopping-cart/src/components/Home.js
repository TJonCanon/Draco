import React, { useState, useEffect } from 'react'
import '../css/Home.css'
import { Navbar }  from './Navbar'
import { Products } from './Products';
import { Banner } from './Banner'
import { auth, db } from '../config/Config'
import { collection, getDocs, query, where } from 'firebase/firestore'
// this is the home page component
export const Home = () => {
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
    // if (loggeduser) { console.log(loggeduser[0].email)}
    return (
        <div className='wrapper'>
            <Navbar />
            <Products />
            <p>{loggeduser ? loggeduser[0].email : "no data"}</p>
        </div>
    )
}