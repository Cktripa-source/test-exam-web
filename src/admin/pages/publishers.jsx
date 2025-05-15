import axios from "axios";
import { Eye, Search, Trash, UserPlus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Publishers=()=>{
  
    const [publishers,setPublishers]=useState([]);
    const [searchTerm,setSearchTerm]=useState('')
    const [isOpenForm,setIsOpenForm]=useState(false)
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        contact:''
    })
    useEffect(()=>{
        axios.get('https://test-exam-apis.onrender.com/getPublishers')
        .then(res=>{
            setPublishers(res.data)
            console.log(res.data);
            
        })
        .catch(err=>{
            toast.error(err.response?.data?.message || 'Failed to fetch publishers')
        })
    },[])

    const filterPublishers=publishers.filter(publisher=>
        publisher.name.toLowerCase().includes(searchTerm.toLowerCase())||
        publisher.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    //create publisher 
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData(prev=>({
            ...prev,
            [name]:value
           }))
    }
const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('https://test-exam-apis.onrender.com/addPublisher',formData)
    .then(res=>{
        toast.success(res.data.message);
        setIsOpenForm(false)
    })
    .catch(err=>{
        toast.error(err.response?.data?.message)
        setFormData({
        name:'',
        email:'',
        contact:''
        })
        
    })
}


    return(
        <div className="w-full">
            <div className="flex border-b p-2 justify-between">
            <h1 className=" text-2xl text-gray-900 font-bold " >Publishers</h1>
            <div className="w-3/5 bg-slate-50 flex justify-between rounded-full border border-gray-400">
            <Search size={26} className="mt-1.5 w-[5%] text-gray-400"/>
            <input 
            type="search" 
            placeholder="Search for name or email ......." 
            value={searchTerm} 
         onChange={(e)=>setSearchTerm(e.target.value)}
         className="w-[95%] bg-transparent p-2 rounded-full outline-none text-md"
         />
            </div>
            <button className="flex p-2 bg-gray-600 text-white rounded-md" onClick={()=>{setIsOpenForm(true)}}><UserPlus/>Add Publisher</button>
            </div>
            <div className="border w-ful mt-10 rounded-lg shadow overflow-x-auto">
                {isOpenForm &&(
                    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="flex flex-col m-auto max-w-lg w-full bg-white justify-center rounded-xl mt-auto relative p-10">
                        <button className="text-red-400 border flex w-20 hover:bg-red-400 hover:text-white rounded-md absolute top-2 right-2" onClick={()=>{setIsOpenForm(false)}}><X/> Close</button>
                        <form className="flex flex-col p-4 w-full gap-4" onSubmit={handleSubmit}>
                        <input className="w-full p-2 border m-auto rounded-md" type="text" name="name" placeholder="Publisher Fullname" onChange={handleChange} value={formData.name}/>
                        <input className="w-full p-2 border m-auto rounded-md" type="email" name="email" placeholder="Publisher Email" onChange={handleChange} value={formData.email}/>
                        <input className="w-full p-2 border m-auto rounded-md" type="text" name="contact" placeholder="Publisher contact" onChange={handleChange} value={formData.contact}/>
                        <button className="flex p-2 bg-gray-600 text-white rounded-md"><UserPlus/>Add publisher</button>
                    </form>
                    </div>
                    </div>
                )}
                <table className="min-w-full divide-y divide-gray-200 rounded-2xl">
                    <thead className="bg-gray-600 text-white ">
                        <tr>
                        <th className="border-r p-2  text-left">Publisher Name</th>
                        <th className="border-r p-2  text-left">Publisher Email</th>
                        <th className="border-r p-2  text-left">Publisher Adress</th>
                        <th className="border-r p-2  text-left ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterPublishers.length > 0 ? (
                            filterPublishers.map(publisher=>(
                                <tr key={publisher.publisher_id} className="capitalize border">
                                 <td className="border-r p-2  text-left">{publisher.name}</td>
                                 <td className="border-r p-2  text-left">{publisher.email}</td>
                                 <td className="border-r p-2  text-left">{publisher.contact}</td>
                                 <td className="border-r p-2  text-center flex m-auto">
                                    <button className="text-center text-gray-700 p-0.2 rounded-full m-auto" title="View"><Eye/></button>
                                    <button className="text-center text-red-700 p-0.2  rounded-full m-auto" title="Delete"><Trash/></button>
                                 </td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan={4}>
                                    <div className="w-full">Not found publishers</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Publishers