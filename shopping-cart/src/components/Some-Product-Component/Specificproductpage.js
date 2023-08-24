import React, { useState, useEffect } from 'react'
import { Navbar } from '../Navbar'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../config/Config'
import { doc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore'


export const Specificproductpage = () => {
    const { producttype, id} = useParams()
    const [ product, setProduct ] = useState('');
    const [ successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

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

    function GetCurrentProduct() {
        useEffect(() =>{
            const getProduct = async () => {

                const docRef = doc(db, `products-${producttype.toUpperCase()}`, id);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
        };
        getProduct();
        }, []);
        return product
    }
    GetCurrentProduct();

    const addtocart = () => {
        if (loggeduser){
            addDoc(collection(db, `cart-${loggeduser[0].uid}`),{
                product, quatity: 1
            }).then(() => {
                setSuccessMsg('Product added to cart');

            }).catch((error) => { setErrorMsg(error.message) });
        }
        else {
            setErrorMsg('You need to login first')
        }
    }

    return (
        <div>
            <Navbar />
            {product ? <div className='myprod-container'>
                <div className='prod-img-cont'>
                    <img src={product.productimage}/>
                </div>
                <div className='prod-data'>
                    <p className='prod-head'>{product.producttitle}</p>
                </div>
                <div className='specific-price-container'>
                    <p className='price'>${product.price}</p>
                </div>

                <p className='prod-details-head'>Details</p>
                <p className='prod-description'>{product.description}</p>
                <div className='row-cont'>
                    <div className='buy-cart'>
                        <button className='btn'>Buy Now</button>
                        <button className='btn' onClick={addtocart}>Add to Cart</button>
                    </div>
                </div>


            </div> : <div>Loading...</div>}
        </div>
    )
}


