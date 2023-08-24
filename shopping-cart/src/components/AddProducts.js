import React, { useState, useEffect } from 'react'
import { storage, auth, db } from '../config/Config'
import { updateProfile } from 'firebase/auth'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { Navbar } from './Navbar'

export const AddProducts = () => {
    const [producttitle, setProductTitle] = useState("");
    const [producttype, setProductType] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [productimage, setProductImage] = useState("");

    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

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

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']
    const handleProductImg = (e) => {
        e.preventDefault();
        let selectedFile = e.target.files[0];

        if (selectedFile) {
            if(selectedFile && types.includes(selectedFile.type)){
                setProductImage(selectedFile);
                setImageError('')
            }
            else{
                setProductImage(null)
                setImageError('please select a valid image file type(png or jpg)')
            }
        }
        else{
            setImageError('please select your file')
        }
    }

    const loggeduser = GetCurrentUser();
    // if (loggeduser) { console.log(loggeduser[0].password)}

    const handleAddProduct = (e)=>{
        e.preventDefault();
        const storageRef = ref(storage,`product-images${producttype.toUpperCase()}/${Date.now()}`)

        uploadBytes(storageRef, productimage)
            .then(()=> {
                getDownloadURL(storageRef).then(url => {
                    addDoc(collection(db, `products-${producttype.toUpperCase()}`),{
                        producttitle,
                        producttype,
                        description,
                        brand,
                        price,
                        productimage: url,
                    })
                })
            })
    }
    return (
        <div>
            <Navbar />
            {loggeduser && loggeduser[0].email == "taylor.joyner93@holberton.com" ?
                <div className='addprod-container'>
                    <form className="addprod-form" onSubmit={handleAddProduct}>
                        <p>Add Product</p>
                        {successMsg && <div className='success-msg'>{successMsg}</div>}
                        {uploadError && <div className='error-msg'>{uploadError}</div>}
                        
                        <label>Product Title</label>
                        <input type="text" onChange={(e)=>{setProductTitle(e.target.value)}} placeholder="Product Title"/>
                        
                        <label>Product Type</label>
                        <select name ="product-types" onChange={(e)=>{setProductType(e.target.value)}} placeholder="Type of Product">
                            <option value="elixers">Elixers</option>
                            <option value="topicals">Topicals</option>
                            <option value="herbs">Herbs</option>
                            <option value="accessories">Accesories</option>
                        </select>
                        <label>Brand Name</label>
                        <input type="text" onChange={(e)=>{setBrand(e.target.value)}} placeholder="Brand Name"/>
                        
                        <label>Image</label>
                        <input type="file" onChange={handleProductImg} />
                        {imageError && <>
                            <div className='error-msg'>{imageError}</div>
                        </>}
                        
                        <label>Description</label>
                        <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder="Describe your product here"/>
                        
                        <label>Price</label>                    
                        <input type="text" onChange={(e)=>{setPrice(e.target.value)}} placeholder="Price"/>

                        <button type='submit'>Add</button>
                    </form>
                </div> : <div>You don't have access to add products</div>}

        </div>
  )
}


