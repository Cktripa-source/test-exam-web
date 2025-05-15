import React, { useState } from "react";
import Image from "../../assets/1-ModernLibrary_White_ILW071_Thumbnail_WEB.webp";
import { Link, useNavigate } from "react-router-dom";
import Catalogs from "./books";

const Home = () => {
    const navigate=useNavigate()
  return (
    <div className="flex flex-col w-full h-screen">
      <div
        className="flex w-full  bg-cover bg-center"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <div className="w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center p-40">
          <div className="max-w-md text-center">
            <h1 className="font-bold text-4xl text-white mb-4">
              Welcome to Our Online CBG II Library
            </h1>
            <p className="text-white text-lg">
             The Best CBG II Library management System 
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full  h-full justify-center items-center bg-white">
            <Catalogs/>
      </div>
    </div>
  );
};

export default Home;
