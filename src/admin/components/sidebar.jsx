import { BookMarked, LayoutDashboard, Library, Text, Truck, UserCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SideBar=()=>{
    const SideBarLinks=[
        {id:1,to:'overview',icon:LayoutDashboard,label:'Overview'},
        {id:2,to:'books',icon:Library,label:'book management'},
        {id:3,to:'suppliers',icon:Truck,label:'supplier management'},
        {id:4,to:'publishers',icon:Text,label:'publisher management'},
        {id:5,to:'borrows',icon:BookMarked,label:'borrow management'},
        {id:6,to:'profile',icon:UserCircle,label:'profile management'}

    ]
 return (
   <><div className="flex flex-col w-60 border-r h-screen p-2 gap-4" >
   {SideBarLinks.map(idex=>(
    <Link key={idex.id} to={idex.to} className="flex items-center p-2 gap-2 capitalize text-gray-700">
       <idex.icon className="w-5 h-5"/>
        {idex.label}
    </Link>
   ))}
    </div>
   </>
 )
}
export default SideBar