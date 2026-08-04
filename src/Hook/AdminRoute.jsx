import React, { useContext } from 'react';
import useRole from './useRole';
import { Navigate, useLocation } from 'react-router-dom';
import ShortLoading from '../Component/USERDashboardAll/ShortLoading/ShortLoading';
import { AuthContext } from '../Component/AuthoncationAll/AuthProvider/AuthProvider';

const AdminRoute = ({children}) => {

    const [roles]=useRole()
    const ad= roles.role === "admin"

    let {user,loading}=useContext(AuthContext)
    let location=useLocation()


    if (loading) {
    //    return <progress className="progress w-56"></progress>
        return <div className=" mt-[50%] h-[100vh] sm:h-0 sm:mt-0 sm:top-[50%] sm:absolute  sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] z-[9999]">
        <ShortLoading></ShortLoading>
        </div>
    }

    if (user && ad) {
        return children
    }

    return <Navigate state={{from:location}} to="/"></Navigate>

};

export default AdminRoute;