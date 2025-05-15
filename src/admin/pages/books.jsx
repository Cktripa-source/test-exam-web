import axios from "axios";
import { Eye, Search, Trash, UserPlus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Books=()=>{
  
    const [books,setBooks]=useState([]);
    const [searchTerm,setSearchTerm]=useState('')
    const[viewDetails,setViewDetails]=useState(null)
    const [isOpenForm,setIsOpenForm]=useState(false)
    const [selectPub,setSelectPub]=useState(null)
    const [selectSup,setSelectSup]=useState(null)
    const [formData,setFormData]=useState({
      title:'',
      genre:'',
      publish_year:'',
      publisher_id:'',
      supplier_id:''
    });
    const [bookImage,setBookImage]=useState(null)
    useEffect(()=>{
        axios.get('https://test-exam-apis.onrender.com/getBooks')
        .then((Response)=>{
            setBooks(Response.data);
        })
        .catch((error)=>{
         toast.success(error.response?.data?.message)
        });

        axios.get("https://test-exam-apis.onrender.com/getPublishers")
        .then(res=>{
           setSelectPub(res.data)
        })
        .catch(err=>{
            toast.error(err.response?.data?.message)
        });

        axios.get("https://test-exam-apis.onrender.com/getSuppliers")
        .then(res=>{
            setSelectSup(res.data)
         })
         .catch(err=>{
             toast.error(err.response?.data?.message)
         });
         
    
    },[])
 
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())||
        book.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())||
        book.publisher_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    //create book
  const handleFileChange=(e)=>{
    setBookImage(e.target.files[0])
  }
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({
        ...prev,
        [name]:value
    }))
  };

  const data=new FormData();
  data.append('title',formData.title)
  data.append('genre',formData.genre)
  data.append('pub_year',formData.pub_year)
  data.append('image',bookImage)
  data.append('publisher_id',formData.publisher_id)
  data.append('supplier_id',formData.supplier_id)

const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('https://test-exam-apis.onrender.com/addBook',data)
    .then(res=>{
        toast.success(res.data.message);
        setIsOpenForm(false)
    })
    .catch(err=>{
        toast.error(err.response?.data?.message)
        setFormData({
        title:'',
        genre:'',
        publish_year:'',
        publisher_id:'',
        supplier_id:''
        })
        
    })
}
    return(
        <div className="w-full">
            <div className="flex border-b p-2 justify-between">
            <h1 className=" text-2xl text-gray-900 font-bold " >Books manage</h1>
            <div className="w-3/5 bg-slate-50 flex justify-between rounded-full border border-gray-400">
            <Search size={26} className="mt-1.5 w-[5%] text-gray-400"/>
            <input 
            type="search" 
            placeholder="Search for book title or genre ......." 
            value={searchTerm} 
         onChange={(e)=>setSearchTerm(e.target.value)}
         className="w-[95%] bg-transparent p-2 rounded-full outline-none text-md"
         />
            </div>
            <button className="flex p-2 bg-gray-600 text-white rounded-md" onClick={()=>{setIsOpenForm(true)}}><UserPlus/>Add book</button>
            </div>
            <div className="border w-ful mt-10 rounded-lg shadow overflow-x-auto">

                {isOpenForm &&(
                        <div className="flex items-center justify-center bg-gray-800 bg-opacity-50 fixed inset-0 ">
                            <div className="max-w-xl w-full relative p-10 shadow-2xl bg-white rounded-lg">
                            <h1 className="font-bold text-2xl text-gray-700 capitalize">Book manage form</h1>
                                <button className="text-red-400 border flex w-20 hover:bg-red-400 hover:text-white rounded-md absolute top-2 right-2" onClick={()=>{setIsOpenForm(false)}}><X/> Close</button>
                          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <input type="text" value={formData.title} onChange={handleChange} name="title" id="" placeholder="Title"  className="w-full p-2 border m-auto rounded-md mt-4"/>
                            <input type="text" value={formData.genre} onChange={handleChange} name="genre" id=""  placeholder="Genre" className="w-full p-2 border m-auto rounded-md mt-4"/>
                            <input type="text" value={formData.pub_year} onChange={handleChange} name="pub_year" id=""  placeholder="Year" className="w-full p-2 border m-auto rounded-md mt-4"/>
                            <input type="file" onChange={handleFileChange} name="image" accept="image/*"  className="w-full p-2 border m-auto rounded-md mt-4"/>
                            <select name="publisher_id" value={formData.publisher_id} className="w-full p-2 border m-auto rounded-md mt-4 font-bold" onChange={handleChange}>
                            <option className="text-gray-600 font-extralight cursor-pointer hover:text-gray-900">Select Publisher</option>
                                {selectPub.map(pub=>(
                                    <>
                                     <option key={pub.id} value={pub.id} className="text-gray-900 font-extralight cursor-pointer hover:text-gray-900 p-2">{pub.name}</option>
                                    </>
                                   
                                ))}
                            </select>
                            <select  name="supplier_id" onChange={handleChange} value={formData.supplier_id}  className="w-full p-2 border m-auto rounded-md mt-4 font-bold">
                            <option className="text-gray-900 font-extralight cursor-pointer hover:text-gray-900 p-2">Select Suppliers</option>
                                {selectSup.map(sup=>(
                                    <>
                                     <option key={sup.id} value={sup.id} className="text-gray-900 font-extralight cursor-pointer hover:text-gray-900 p-2">{sup.name}</option>
                                    </>
                                   
                                ))}
                            </select>
                            <button  className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-600">Add Book</button>
                            <button onClick={()=>{setIsOpenForm(false)}} className="p-2 bg-red-800 text-white rounded-md hover:bg-red-600">Cancel</button>
                          </form>
                          </div>
                        </div>
                )}

                <table className="min-w-full divide-y divide-gray-200 rounded-2xl">
                    <thead className="bg-gray-600 text-white divide-y divide-red-500 ">
                        <tr>
                        <th className="border-r p-2  text-left">book Image</th>
                        <th className="border-r p-2  text-left">book Title</th>
                        <th className="border-r p-2  text-left">book genre</th>
                        <th className="border-r p-2  text-left">book publisher</th>
                        <th className="border-r p-2  text-left">book Supplier</th>
                        <th className="border-r p-2  text-left">book Status</th>
                        <th className="border-r p-2  text-left ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map(book=>(
                                <tr key={book.book_id} className="capitalize border-b">
                                    <td className="border-r p-2  text-center">
                                        <img src={`https://test-exam-apis.onrender.com/${book.image}`} alt="" className="h-16 w-16 m-auto" />
                                    </td>
                                 <td className="border-r p-2  text-left">{book.title}</td>
                                 <td className="border-r p-2  text-left">{book.genre}</td>
                                 <td className="border-r p-2  text-left">{book.supplier_name}</td>
                                 <td className="border-r p-2  text-left">{book.publisher_name}</td>
                                 <td
  className="border-r p-2  text-left">
 <span className={`border-r p-2 text-left font-semibold text-white rounded
    ${
      book.status === 'avairable'
        ? 'bg-green-500'
        : book.status === 'borrowed'
        ? 'bg-red-500'
        : 'bg-gray-400'
    }`}> {book.status}</span>
</td>

                                 <td className=" p-2  text-center flex m-auto ">
                                    <button className="text-center text-gray-700 p-0.2 rounded-full m-auto mt-5" title="View" onClick={()=>{setViewDetails(book)}}><Eye/></button>
                                    <button className="text-center text-red-700 p-0.2  rounded-full m-auto mt-5" title="Delete"><Trash/></button>
                                 </td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan={4}>
                                    <div className="w-full">Not found books</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {viewDetails && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
      <button
        onClick={() => setViewDetails(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-300"
      >
        <X size={24} />
      </button>

      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={`https://test-exam-apis.onrender.com/${viewDetails.image}`}
          alt=""
          className="w-full md:w-1/3 h-60 mt-auto object-cover rounded-lg border"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{viewDetails.title}</h1>
          <p className="text-sm text-gray-600 mb-1">Genre: {viewDetails.genre}</p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-1">Publisher Details</h2>
            <p className="text-sm">Name: {viewDetails.publisher_name}</p>
            <p className="text-sm">Email: {viewDetails.publisher_email}</p>
            <p className="text-sm">Address: {viewDetails.publisher_address}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-1">Supplier Details</h2>
            <p className="text-sm">Name: {viewDetails.supplier_name}</p>
            <p className="text-sm">Email: {viewDetails.supplier_email}</p>
            <p className="text-sm">Contact: {viewDetails.supplier_contact}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        </div>
    )
}
export default Books
