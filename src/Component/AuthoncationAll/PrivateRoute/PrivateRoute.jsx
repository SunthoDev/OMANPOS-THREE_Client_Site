import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
// import { PacmanLoader } from 'react-spinners';
// import ShortLoading from '../../USERDashboardAll/ShortLoading/ShortLoading';

const PrivateRoute = ({ children }) => {

    let { user, loading  } = useContext(AuthContext)

    let location = useLocation()
    // console.log(user,loading)
    // let loading = true

    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    if (user) {
        return children
    }
    return <Navigate state={{ from: location }} to="/"></Navigate>
};

export default PrivateRoute;