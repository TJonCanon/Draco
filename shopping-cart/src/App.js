import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Signup } from './components/Signup'
import { Cart } from './components/Cart';
import { pgFOF } from './components/pgFOF';
import { UserProfile } from './components/UserProfile';
import { AddProducts } from './components/AddProducts';
import { Allproductpage } from './components/Some-Product-Component/Allproductpage';
import { Specificproductpage } from './components/Some-Product-Component/Specificproductpage'

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<Home />} />
          <Route path = '/home' element={<Home />} />
          <Route path = '/signup' element={<Signup />} />
          <Route path = '/login' element={<Login />} />
          <Route path = '/cart' element={<Cart />} />
          <Route path = '/userprofile' element={<UserProfile />} />
          <Route path = '/sellproducts' element={<AddProducts />} />
          <Route path = '/product-types/elixirs'element={<Allproductpage type={'Elixirs'} />}/>
          <Route path = '/product-types/topicals'element={<Allproductpage type={'Topicals'} />}/>
          <Route path = '/product-types/herbs'element={<Allproductpage type={'Herbs'} />}/>
          <Route path = '/product-types/accessories'element={<Allproductpage type={'Accessories'} />}/>
          <Route path = '/product/:producttype/:id' element={<Specificproductpage/>} />
          <Route path = '/cartdata' element={<Cart />} />
          <Route path = '*' element={<pgFOF />} />       
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;