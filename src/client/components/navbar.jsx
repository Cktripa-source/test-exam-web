import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Library, BookOpenCheck, BookMarked, LogIn, UserPlus, X, Menu, HomeIcon, LogOut, LayoutDashboard } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkAuth(); 
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    window.location.reload();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white border-b px-8 py-4 flex items-center justify-between fixed top-0 z-20">
      {/* Logo */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
        <Library size={28} className="text-gray-600" />
        <span className="text-xl font-bold text-gray-700">MyLibrary</span>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex space-x-20 text-gray-700 font-medium">
        <Link to="/" className="flex items-center gap-1 hover:text-gray-600 transition duration-200">
          <HomeIcon size={20} />
          Home
        </Link>
        <Link to="/books" className="flex items-center gap-1 hover:text-gray-600 transition duration-200">
          <BookMarked size={20} />
          Browser Books
        </Link>
      </div>

      {/* Mobile toggle */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
        {!isOpen ? <Menu size={28} /> : <X size={28} />}
      </button>

      {/* Auth buttons */}
      {!isLoggedIn ? (
        <div className="hidden md:flex space-x-4">
          <Link to="/register" className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            <UserPlus size={18} />
            Register
          </Link>
          <Link to="/login" className="flex items-center gap-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">
            <LogIn size={18} />
            Login
          </Link>
        </div>
      ) : (
        <>
          <Link to="/userDashboard" className="hidden md:flex items-center gap-1 hover:text-gray-600 transition duration-200">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <div className="hidden md:flex space-x-4">
            <button onClick={handleLogout} className="flex items-center gap-1 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </>
      )}

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-10 px-6 py-4 md:hidden h-screen">
          <Link to="/browse-books" onClick={() => setIsOpen(false)} className="flex items-center gap-1 hover:text-gray-600 transition duration-200">
            <BookOpenCheck size={20} />
            Browse Books
          </Link>
          <Link to="/borrow-book" onClick={() => setIsOpen(false)} className="flex items-center gap-1 hover:text-gray-600 transition duration-200">
            <BookMarked size={20} />
            Borrow Book
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/register" onClick={() => setIsOpen(false)} className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                <UserPlus size={18} />
                Register
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">
                <LogIn size={18} />
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashbord/overview" onClick={() => setIsOpen(false)} className="flex items-center gap-1 hover:text-gray-600 transition duration-200">
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center gap-1 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition">
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
