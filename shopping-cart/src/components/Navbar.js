import React, { useState, useEffect } from 'react';
import {Link, Navigate, useNavigate } from 'react-router-dom'
import logo from "../images/logo.png"
import cart from "../images/cart.png"
import profile from "../images/user.png"
import { auth, db } from "../config/Config"
import { collection, getDocs, query, where } from 'firebase/firestore'

export const Navbar = () => {
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

    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate("/login")
        })
    }

    const [cartdata,setcartdata] = useState([]);
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


    return (
        <div>
            <div className='navbar'>           
                <div className='LeftContainer'>
                    <img src={logo} />
                </div>
                    <div className="RightContainer">
                        {!loggeduser && <nav>
                            <Link to='/'><button>Home</button></Link>
                            <Link to='/signup'><button>Register</button></Link>
                            <Link to='/login'><button>Login</button></Link>
                            <div className='cart-btn'>
                                <img src={cart} alt="no img" />
                                <span className='cart-icon-css'>0</span>
                            </div>
                        </nav>}

                        {loggeduser && 
                            <nav>
                                <Link to='/'><button>Home</button></Link>
                                <Link to='/sellproducts' ><button>Sell</button></Link>
                                <div className='cart-btn'>
                                    <Link to ='/cartdata'><img src={cart} alt="no img" /></Link>
                                    <button className='cart-icon-css'>{cartdata.length}</button>
                                <Link to="/userprofile">
                                    <img src={profile} className='profile-icon' />
                                </Link>
                                <button className='logout-btn' onClick={handleLogout}>Logout</button>
                                </div>
                            </nav>
                        }
                </div>
            </div>
            <div className='product-types'>
                <a href='/product-types/elixirs'><button>Elixirs</button></a>
                <a href='/product-types/topicals'><button>Topicals</button></a>
                <a href='/product-types/herbs'><button>Herbs</button></a>
                <a href='/product-types/accessories'><button>Accessories</button></a>
            </div>
        </div>
    )
}