
import Dashboard from './admin/pages/dashboard';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './client/components/navbar';
import { useState } from 'react';
import Login from './client/pages/login';
import Register from './client/pages/register';
import Home from './client/pages/home';
import Books from './admin/pages/books';
import Catalogs from './client/pages/books';
import Publishers from './admin/pages/publishers';
import Suppliers from './admin/pages/suppliers';
import Borrows from './admin/pages/borrowed';
import Overview from './admin/pages/overview';
import Profiles from './admin/pages/profile';


function App() {
  const [showNavBar,setShowNavBar]=useState(true)
  return (
    <BrowserRouter>
    {showNavBar && <Navbar/>}
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/books' element={<Catalogs/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard setShowNavBar={setShowNavBar}/>}>
      <Route path='/dashboard/overview' element={<Overview/>}/>
      <Route path='/dashboard/books' element={<Books/>}/>
      <Route path='/dashboard/publishers' element={<Publishers/>}/>
      <Route path='/dashboard/suppliers' element={<Suppliers/>}/>
      <Route path='/dashboard/borrows' element={<Borrows/>}/>
      <Route path='/dashboard/profile' element={<Profiles/>}/>
      </Route>
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
