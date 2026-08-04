import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../../Home/Home';
import Dashboard from '../../DashboardAll/Dashboard/Dashboard';
import Error from '../Error/Error';
import SingUp from '../../AuthoncationAll/SingUp/SingUp';
import Main from '../../OutlateAll/Main/Main';
import Login from '../../AuthoncationAll/Login/Login';
import AdminSeeAllUser from '../../DashboardAll/AdminPanelDashboardAll/AdminSeeAllUser/AdminSeeAllUser';
import PrivateRoute from '../../AuthoncationAll/PrivateRoute/PrivateRoute';
import UserInformationSeeQR from '../../Home/UserInformationSeeQR/UserInformationSeeQR';
import NPORSUserInformationAdd from '../../DashboardAll/AdminPanelDashboardAll/NPORSUserInformationAdd/NPORSUserInformationAdd';
import NPORSUserAllInformation from '../../DashboardAll/AdminPanelDashboardAll/NPORSUserAllInformation/NPORSUserAllInformation';
import UpdateUserInformation from '../../DashboardAll/AdminPanelDashboardAll/UpdateUserInformation/UpdateUserInformation';


let route = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <UserInformationSeeQR></UserInformationSeeQR>,
            },
            {
                path: "/User/&/page/preview/:id",
                element: <UserInformationSeeQR></UserInformationSeeQR>,
            },
            {
                path: "/SingUp",
                element: <SingUp></SingUp>
            },
            {
                path: "/Login",
                element: <Login></Login>
            },

        ]
    },


    // Admin Panel  Work
    // ========================
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "NPORSUserInformationAdd",
                element: <PrivateRoute><NPORSUserInformationAdd></NPORSUserInformationAdd></PrivateRoute>
            },
            {
                path: "NPORSUserAllInformation",
                element: <PrivateRoute><NPORSUserAllInformation></NPORSUserAllInformation></PrivateRoute>,
                loader: () => fetch("https://server.doscwallet.com/totalUserCount")
            },
            {
                path: "UpdateUserInformation/:id",
                element: <PrivateRoute><UpdateUserInformation></UpdateUserInformation></PrivateRoute>,
                loader: ({ params }) => fetch(`https://server.doscwallet.com/UpdateUserDataGet/${params?.id}`)
            },
            {
                path: "AdminSeeAllUser",
                element: <PrivateRoute><AdminSeeAllUser></AdminSeeAllUser></PrivateRoute>
            }
        ]
    },
    {
        path: "*",
        element: <Error></Error>
    }

])

export default route;

// https://server.doscwallet.com