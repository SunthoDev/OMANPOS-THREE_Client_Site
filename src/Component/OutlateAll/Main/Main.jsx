import { useState, useEffect } from "react";
import "./Main.css"
import { Outlet } from 'react-router-dom';
import Header from "../Header/Header";
import Foter from "../Foter/Foter";


const Main = () => {


    return (
        <div className="bg-white ">

            {/* <Header></Header> */}

            <Outlet />


        </div>
    );
};

export default Main;