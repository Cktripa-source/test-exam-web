import React, { useState } from "react";
import Image from "../../assets/1-ModernLibrary_White_ILW071_Thumbnail_WEB.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
   const [formData,setFormData]=useState({
    name:'',
    email:'',
    role:'',
    password:''
   });
const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({
        ...prev,
        [name]:value
    }))
}

const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('https://test-exam-apis.onrender.com/register',formData)
    .then(res=>{
        navigate('/login')
        setLoading(true)
        toast.success(res.data.message);
        
    })
    .catch(err=>{
        setLoading(true)
        toast.error(err.response?.data?.message)
        
    })
    .finally(() => {
        setLoading(false);
        return
      });
}


  return (
    <div className="flex w-full h-screen">
      <div
        className="hidden md:flex w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <div className="w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center p-10">
          <div className="max-w-md text-center">
            <h1 className="font-bold text-4xl text-white mb-4">
              Welcome to Our Online Library
            </h1>
            <p className="text-white text-lg">
              Dive into a world of knowledge. Discover thousands of books,
              articles, and resources at your fingertips. Join us today!
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 h-full justify-center items-center bg-white">
        <div className="w-full max-w-md p-8 shadow-lg rounded-2xl animate-slide-in">
          <h2 className="text-3xl font-bold text-center mb-6">Register to create new Account</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
              <label className="block mb-1 font-medium text-gray-700">name</label>
              <input
                type="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Pat Pazo"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400">
                <option value="">choose Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="••••••••"
                required
              />
            </div>
            <button
  type="submit"
  disabled={loading}
  className={`w-full bg-gray-600 text-white py-2 rounded-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
>
  {loading ? 'Registering...' : 'Register'}
</button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
           Already have an account? <Link to="/Login" className="text-gray-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
