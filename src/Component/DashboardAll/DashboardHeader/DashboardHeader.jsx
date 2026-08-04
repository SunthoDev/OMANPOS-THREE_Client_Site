import React from 'react';
import "./DashboardHeader.css"
import logo from "../../../assets/logo-two.png"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';

const DashboardHeader = () => {

    let { logOutUser } = useContext(AuthContext)
    let navigate = useNavigate()

    let handleSendRequest = () => {
        alert("Send Your Request")
    }

    let LogOut = () => {
        logOutUser()
            .then(result => {
                navigate("/")
            })
    }

    return (
        <div className="DashboardNavbar navbar bg-base-100">
            {/* ================================== */}
            <div className="flex-1">

                {/* Dashboard sidebar open drawer */}

                <label htmlFor="my-drawer-2" className="btn w-[60px] md:hidden"><i class="fa text-black text-2xl fa-bars" aria-hidden="true"></i></label>
                <div className="w-[20%]">
                    <img className='w-[100%]' src={logo} alt="img" />
                </div>


                <div className="hidden md:block">
                    <div className="flex gap-4 ml-0 md:ml-[64px] ">
                        {/* <h3 className='text-[16px] font-[600] text-black'>Pick & Drop</h3>
                        <h3 className='text-[16px] font-[600] text-black'>SMS</h3>
                        <h3 className='text-[16px] font-[600] text-black'>Monitoring</h3> */}
                    </div>
                </div>
            </div>

            {/* ================================== */}
            <div className="flex-none gap-2">

                <div className="form-control">
                    {/* <i className="fa text-[26px] font-[600] mr-[10px] fa-comments-o" aria-hidden="true"></i> */}
                </div>

                {/* <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar mx-[32px]">
                        <div className="ProfileIcon">
                            <img className='w-[100%]' src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        </div>
                    </label>



                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link to="#" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li onClick={handleSendRequest}><a>Delete Account</a></li>
                        <hr />
                        <li><button onClick={LogOut}>Logout</button></li>
                    </ul>

                </div> */}

            </div>
        </div>
    );
};

export default DashboardHeader;