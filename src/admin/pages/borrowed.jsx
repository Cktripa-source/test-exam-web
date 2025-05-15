import axios from "axios";
import { Edit, Eye, Search, Trash, UserPlus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Borrows=()=>{
  
    const [borrows,setBorrows]=useState([]);
    const [searchTerm,setSearchTerm]=useState('')
    const [isOpenForm,setIsOpenForm]=useState(false)
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        contact:''
    })
    useEffect(()=>{
        axios.get('https://test-exam-apis.onrender.com/getBorrows')
        .then(res=>{
            setBorrows(res.data)
            console.log(res.data);
            
        })
        .catch(err=>{
            toast.error(err.response?.data?.message || 'Failed to fetch Borrows')
        })
    },[])

    const filterBorrows=borrows.filter(borrow=>
        borrow.book_name.toLowerCase().includes(searchTerm.toLowerCase())||
        borrow.borrower_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const handleMarkReturned = (id) => {
        axios.put(`https://test-exam-apis.onrender.com/updateBorrow/${id}`, { status: 'returned' })
          .then(res => {
            toast.success(res.data.message || 'Marked as Returned!');
            setBorrows(prev =>
              prev.map(borrow =>
                borrow.id === id ? { ...borrow, status: 'returned' } : borrow
              )
            );
          })
          .catch(err => {
            toast.error(err.response?.data?.message || 'Failed to update status');
          });
      };
      const handleDelete = (id) => {
        axios.delete(`https://test-exam-apis.onrender.com/deleteBorrow/${id}`, { status: 'returned' })
          .then(res => {
            toast.success(res.data.message)
          })
          .catch(err => {
            toast.error(err.response?.data?.message || 'Failed to delete status');
          });
      };
      

    return(
        <div className="w-full">
            <div className="flex border-b p-2 justify-between">
            <h1 className=" text-2xl text-gray-900 font-bold " >Borrows</h1>
            <div className="w-3/5 bg-slate-50 flex justify-between rounded-full border border-gray-400">
            <Search size={26} className="mt-1.5 w-[5%] text-gray-400"/>
            <input 
            type="search" 
            placeholder="Search for book name borrower name......." 
            value={searchTerm} 
         onChange={(e)=>setSearchTerm(e.target.value)}
         className="w-[95%] bg-transparent p-2 rounded-full outline-none text-md"
         />
            </div>
            </div>
            <div className="border w-ful mt-10 rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-2xl">
                    <thead className="bg-gray-600 text-white ">
                        <tr>
                        <th className="border-r p-2  text-left">book name</th>
                        <th className="border-r p-2  text-left">borrower name</th>
                        <th className="border-r p-2  text-left">borrowed date</th>
                        <th className="border-r p-2  text-left ">return date</th>
                        <th className="border-r p-2  text-left ">active/returned</th>
                        <th className="border-r p-2  text-left ">Actions</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {filterBorrows.length > 0 ? (
                            filterBorrows.map(borrow=>(
                                <tr key={borrow.id} className="capitalize border">
                                 <td className="border-r p-2  text-left">{borrow.book_name}</td>
                                 <td className="border-r p-2  text-left">{borrow.borrower_name}</td>
                                 <td className="border-r p-2  text-left">{new Date(borrow.borrow_date).toISOString().split('T')[0]}</td>
                                 <td className="border-r p-2  text-left">{new Date(borrow.return_date).toISOString().split('T')[0]}</td>
                                 <td className={`p-2 text-center text-white ${
                                  borrow.status === 'active' ? 'bg-yellow-400' :
                                  borrow.status === 'returned' ? 'bg-green-500' : 'bg-gray-200'
                                  }`}>
                                  {borrow.status}
                                  </td>
                                 <td className="border-r p-2  text-center flex m-auto">
                                    <button
                                   onClick={() => handleMarkReturned(borrow.id)}
                                   className=" flex items-center text-center text-green-700 p-0.2 rounded-full m-auto ml-2"
                                   title="Mark as Returned"
                                   >
                                 <Edit/>  Mark Returned
                                   </button>

                                    <button className="text-center text-gray-700 p-0.2 rounded-full m-auto" title="View"><Eye/></button>
                                    <button onClick={() => handleDelete(borrow.id)} className="text-center text-red-700 p-0.2  rounded-full m-auto" title="Delete"><Trash/></button>
                                 </td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan={4}>
                                    <div className="w-full">Not found Borrows</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Borrows