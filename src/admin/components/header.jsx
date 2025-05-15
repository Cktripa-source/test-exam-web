import { Library, MoveRight, UserCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Header=()=>{
    return(
        <>
        <div className="flex  justify-between p-2 border-b">
            <div className="flex p-2 items-center hover:cursor-pointer"><Library size={35} className="text-gray-600"/><h1 className="font-bold text-2xl text-gray-600">MyLibrary</h1></div>
            <div className="flex p-2 "><Link to='/' className="flex items-center gap-4 text-gray-600 font-semibold"><MoveRight/>Go to website</Link></div>
            <div className="flex items-center"><button className="p-2 border rounded-full"><UserCircle/></button></div>
        </div>
        </>
    )
}
export default Header