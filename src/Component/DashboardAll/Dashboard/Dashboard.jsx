import React, { useContext } from 'react';
import "./Dashboard.css"
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaWallet, FaHome, FaUserPlus, FaUsers, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';

const Dashboard = () => {
    let { logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    let LogOut = () => {
        logOutUser()
            .then(() => {
                navigate("/");
            })
    }

    return (
        <div className="drawer md:drawer-open bg-[#fcfcfd]">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col min-h-screen">
                <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-slate-100">
                    <DashboardHeader />
                </div>

                <main className="flex-grow mt-0">
                    <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-50 min-h-[85vh]">
                        <Outlet />
                    </div>
                </main>
            </div>

            <div className="drawer-side z-40">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <aside className="w-[240px] h-full bg-white flex flex-col border-r border-slate-100">
                    <div className="p-8">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                <FaShieldAlt className="text-white text-lg" />
                            </div>
                            <div>
                                <h3 className="text-slate-800 text-base font-black tracking-tight leading-none">Admin Panel</h3>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Management</p>
                            </div>
                        </div>
                    </div>

                    <ul className="flex-grow px-4 space-y-1.5 menu">
                        <p className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[2px] mb-3">General</p>

                        {/* প্রতিটি NavLink এর ভেতরে ({ isActive }) ডেসট্রাকচার করা হয়েছে */}
                        <li>
                            <NavLink to="/dashboard/NPORSUserInformationAdd"
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-5 py-3 rounded-2xl font-bold transition-all duration-300 group 
            ${isActive
                                        ? 'bg-indigo-600 !text-white shadow-xl shadow-indigo-100 scale-[1.02]'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <FaUserPlus className={`text-lg transition-colors ${isActive ? '!text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                                        <span className="text-sm">User Info Add</span>
                                    </>
                                )}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/NPORSUserAllInformation"
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-5 py-3 rounded-2xl font-bold transition-all duration-300 group 
            ${isActive
                                        ? 'bg-indigo-600 !text-white shadow-xl shadow-indigo-100 scale-[1.02]'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <FaWallet className={`text-lg transition-colors ${isActive ? '!text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                                        <span className="text-sm">All User Info</span>
                                    </>
                                )}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/AdminSeeAllUser"
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-5 py-3 rounded-2xl font-bold transition-all duration-300 group 
            ${isActive
                                        ? 'bg-indigo-600 !text-white shadow-xl shadow-indigo-100 scale-[1.02]'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <FaUsers className={`text-lg transition-colors ${isActive ? 'text-black' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                                        <span className="text-sm">Manage Users</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>

                    <div className="p-4 border-t border-slate-50 space-y-2">
                        <Link to="/" className="flex items-center gap-4 px-5 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-all">
                            <FaHome className="text-lg text-slate-400" />
                            <span className="text-sm">Back to Home</span>
                        </Link>

                        <button
                            onClick={LogOut}
                            className="flex items-center gap-4 w-full px-5 py-3 bg-rose-50 text-rose-600 rounded-2xl font-black hover:bg-rose-600 hover:text-white transition-all duration-300 group shadow-sm shadow-rose-100"
                        >
                            <FaSignOutAlt className="text-lg group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Logout Account</span>
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Dashboard;