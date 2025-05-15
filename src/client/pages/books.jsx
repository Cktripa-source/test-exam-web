import React, { useEffect, useState } from "react";
import { BookOpen, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Catalogs = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:5000/getBooks')
      .then(res => {
        setBooks(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || "Failed to load books");
        toast.error(err.response?.data?.message || "Failed to load books");
        setLoading(false);
      });
    
  }, []);

  const handleBorrow = (bookId) => {
    const userId = localStorage.getItem('userId') // 👈 get stored user ID
    if (!userId) {
        toast.error("Please Login first to borrow book !")
        return
    }

    axios.post('http://localhost:5000/addBorrow', { book_id: bookId, member_id: userId })
        .then(() => {
            setBooks(books.map(book => 
                book.id === bookId ? { ...book, status: 'borrowed' } : book
            ))
            toast.success("Book borrowed successfully!")
        })
        .catch(err => {
            toast.error(err.response?.data?.message || "Failed to borrow book")
        })
}



  return (
    <div className="bg-gray-50 w-full min-h-screen py-10 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Library Book Catalog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our collection of books and borrow what interests you
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading books...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
            <p className="text-red-500">{error}</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-10">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No books available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-64 bg-gray-200">
                  <img
                    src={`http://localhost:5000/${book.image}`} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                    book.status === 'borrowed' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {book.status === 'borrowed' ? 'Borrowed' : 'Available'}
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {book.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full line-clamp-2">
                      {book.genre}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>
                      Publisher: <span className="font-medium">{book.publisher_name}</span>
                    </p>
                    <p>
                      Published: <span className="font-medium">{book.pub_year}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleBorrow(book.id)}
                    disabled={book.status === 'borrowed'}
                    className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
                      book.status === 'borrowed'
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-700 text-white"
                    } transition-colors duration-200`}
                  >
                    {book.status === 'borrowed' ? (
                      <>
                        <CheckCircle size={18} />
                        <span>Already Borrowed</span>
                      </>
                    ) : (
                      "Borrow Book"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogs;