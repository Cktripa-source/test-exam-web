import React, { useEffect } from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";

const Dashboard=({setShowNavBar})=>{

    useEffect(()=>{
        setShowNavBar(false)
        toast.success("Welcome to dashboard")
        return()=>{
            setShowNavBar(true)
        }
    },[setShowNavBar])
    return(
     <>
     <Header/>
     <div className="flex relative">
        <SideBar/>
        <div className="flex-1 p-10">
            <Outlet/>
        </div>
     </div>
     </>
    )
}
export default Dashboard