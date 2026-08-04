import { useState, useEffect } from "react";
import "./Header.css";
import HeaderLogo from "../../../assets/logo.png"
import useRole from "../../../Hook/useRole";
import { Link } from "react-router-dom";

const Header = () => {


    const [roles] = useRole()
    const ad = roles?.role === "admin"


    return (
        <div className="NavBarParent">

            <div className="NavBar w-[100%] h-[130px] bg-[#1a69a9]">

                <div className="Logo px-[15px] py-[15px] w-[100%] md:w-[750px] lg:w-[970px] xl:w-[1170px] mx-auto">
                    <Link to="/">
                        <img src={HeaderLogo} alt="img" className="" />
                    </Link>
                </div>

            </div>

            {/* ================================= */}
            {ad ?
                <div className="NPORServices bg-white relative">
                    <h2 className="px-[15px] py-[12px] w-[100%] md:w-[750px] lg:w-[970px] xl:w-[1170px] mx-auto text-[30px] font-[700] text-[#434a54]">NPORS Online Services</h2>
                    <Link to="/dashboard">
                        <button className="AdminDashboard hidden md:block">Dashboard</button>
                    </Link>
                </div>
                :
                <div className="NPORServices bg-white">
                    <h2 className="px-[15px] py-[12px] w-[100%] md:w-[750px] lg:w-[970px] xl:w-[1170px] mx-auto text-[30px] font-[700] text-[#434a54]">NPORS Online Services</h2>
                </div>
            }


        </div >
    );
};

export default Header;














