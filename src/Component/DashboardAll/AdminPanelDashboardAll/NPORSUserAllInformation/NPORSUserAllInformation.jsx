import React, { useEffect, useState, useRef } from 'react';
import "./NPORSUserAllInformation.css"
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import NPORSUserData from './NPORSUserData/NPORSUserData';
import { useLoaderData, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

const NPORSUserAllInformation = () => {

    // ================================
    // User Data Find
    // ================================
    // const { data: NPORSUserAllData = [] } = useQuery({
    //     queryKey: ["UserInfo"],
    //     queryFn: async () => {
    //         const res = await fetch("https://server.docswallat.com/UserInfo");
    //         return res.json();
    //     },
    // });

    // ==========================================
    // Delete user Information with user PDF
    // ==========================================
    let HandleDelete = (id, OriginalId, AttestedId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                if (OriginalId !== "" || AttestedId !== "") {
                    let PDFIds = [OriginalId, AttestedId].filter(id => id !== "");
                    console.log(PDFIds);

                    // Before, Delete user PDF which is add with information 
                    // =======================================================
                    fetch(`https://server.docswallat.com/delete-user-pdfs/${id}`, {
                        method: "DELETE",
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.deletedFiles.length > 0) {
                                // After, Delete user Information 
                                // =====================================
                                fetch(`https://server.docswallat.com/DeleteUserInformation/${id}`, {
                                    method: "DELETE",
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        // console.log(data)
                                        if (data.deletedCount > 0) {
                                            Swal.fire({
                                                position: "top-end",
                                                icon: "success",
                                                title: "Admin Delete User has been Success",
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                            refetch()
                                        }
                                    })
                            }
                        })
                } else {
                    // console.log("No PDF IDs to delete");
                    // Only Delete User Information. If not have any PDF with user info.
                    // ======================================================================
                    fetch(`https://server.docswallat.com/DeleteUserInformation/${id}`, {
                        method: "DELETE",
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Admin Delete User has been Success",
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            // console.log(data)
                            refetch()
                        })
                }
            }
        });
    }


    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // User pagination Start
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    // ja page click korvo ay curent page state set hova and tar data oh set hova / are page num jahatu 0 thaka suru hova thi tar default value hova 0
    let [currentPage, setCurrentPage] = useState(0)

    // decide or per page item number 
    let [itemPerPage, setItemPerPage] = useState(80)

    // determine total number of users   
    const { totalUsers } = useLoaderData();
    // console.log(totalUsers)

    // calculate the total number of page 
    let totalPage = totalUsers ? Math.ceil(totalUsers / itemPerPage) : 0;

    // how to create every page button ,,  for total page so 
    let pageNumber = [...Array(totalPage).keys()]

    // use option per page koyta kore products dhakava 
    let option = [5, 10, 15, 20, 25, 30]
    function handleSelectChange(event) {
        setItemPerPage(parseInt(event.target.value))
        setCurrentPage(0)
    }

    // server all products data lode condition per page limete data lode
    const { data: NPORSUserAllData = [], refetch, error, isLoading } = useQuery({
        queryKey: ["UserAllDataPagination", currentPage, itemPerPage],
        queryFn: async () => {
            const response = await fetch(`https://server.docswallat.com/UserAllDataPagination?page=${currentPage}&limit=${itemPerPage}`);
            const data = await response.json();
            return data;
            // return data.reverse();
        },
    },);


    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // User pagination End
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



    return (
        <div className='UserDataAdmin bg-white '>

            {/* Registered Users Information Total Count !! */}
            {/* ========================================================== */}
            <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
                {/* Background Decoration */}
                <div className="absolute top-[-20%] right-[-5%] w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                            Registered Users Information !!
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">Manage and monitor all user information</p>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl shadow-slate-200">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Users size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Count</span>
                            <span className="text-2xl font-mono font-bold leading-none">{totalUsers}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            {/* pagination Button use Start */}
            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

            <div className="flex flex-col items-center gap-3 my-12">
                {/* মেইন কন্টেইনার ৮৮০px */}
                <div className="flex items-center justify-between w-full max-w-[880px] bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

                    {/* Previous Button */}
                    <button
                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-700 font-semibold group"
                    >
                        <ChevronLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Scrollable Buttons Area */}
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide px-6 py-2 cursor-grab active:cursor-grabbing select-none"
                        style={{ maxWidth: '650px', scrollBehavior: 'smooth' }}>
                        {pageNumber?.map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`min-w-[48px] h-[48px] flex items-center justify-center rounded-2xl font-bold text-lg transition-all duration-300 ${currentPage === number
                                    ? "bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-200 scale-110"
                                    : "bg-slate-50 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                                    }`}
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage(Math.min(pageNumber.length - 1, currentPage + 1))}
                        disabled={currentPage === pageNumber.length - 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-700 font-semibold group"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Progress Indicator */}
                <p className="text-sm font-medium text-slate-400">
                    Page <span className="text-slate-900">{currentPage + 1}</span> of <span className="text-slate-900">{pageNumber.length}</span>
                </p>
            </div>

            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            {/* pagination Button use End */}
            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

            {/* User registered all information show bellow !!  */}
            {/* ========================================================== */}
            <div className='userData bg-[#F6F6F6] rounded-[8px] mx-0 md:mx-6 my-4 px-4 py-8'>

                {/* Product Quantity show !! */}
                <div className="relative overflow-hidden bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm mb-8 group hover:shadow-md transition-all duration-300">
                    {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#1E8F85]/5 rounded-full blur-3xl group-hover:bg-[#1E8F85]/10 transition-colors"></div>

                    <div className="flex items-center gap-5">
                        {/* আইকন বক্স */}
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E8F85] to-[#146e66] shadow-lg shadow-[#1E8F85]/20 animate-pulse-slow">
                            <svg 
                                className="w-7 h-7 text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>

                        {/* টেক্সট কন্টেন্ট */}
                        <div>
                            <p className="text-[12px] font-black text-slate-400 uppercase tracking-[2px] mb-1">
                                Inventory Overview
                            </p>
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                                    {NPORSUserAllData?.length || 0}
                                </h2>
                                <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">
                                    Total Products
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* নিচের ডেকোরেটিভ লাইন */}
                    <div className="w-full h-1 bg-slate-50 rounded-full mt-5 overflow-hidden">
                        <div className="w-1/3 h-full bg-gradient-to-r from-[#1E8F85] to-transparent rounded-full animate-shimmer"></div>
                    </div>
                </div>

                {/* Product loading and product data show !! */}
                {
                    isLoading ?
                        <div className="w-full py-10 flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 animate-pulse">

                            {/* এনিমেটেড আইকন এবং স্পিনার */}
                            <div className="relative mb-4">
                                <div className="w-16 h-16 border-4 border-[#1E8F85]/10 border-t-[#1E8F85] rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#1E8F85] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10 a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                </div>
                            </div>

                            {/* টেক্সট মেসেজ */}
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-slate-700">Uploading & Syncing</h3>
                                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">
                                    Please don't close this tab
                                </p>
                            </div>

                            {/* কাস্টম প্রগ্রেস বার */}
                            <div className="w-64 h-1.5 bg-slate-200 rounded-full mt-6 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#1E8F85] to-[#146e66] animate-inner-loading rounded-full"></div>
                            </div>
                        </div>
                        :
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="text-[14px] font-[600] text-white">Name</th>
                                        <th className="text-[14px] font-[600] text-white">Document Type</th>
                                        <th className="text-[14px] font-[600] text-white">Pay Id</th>
                                        <th className="text-[14px] font-[600] text-white">Status</th>
                                        <th className="text-[14px] font-[600] text-white">QR Code</th>
                                        <th className="text-[14px] font-[600] text-white">Role</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        NPORSUserAllData?.map(NporsUserData => <NPORSUserData HandleDelete={HandleDelete} key={NporsUserData._id} NporsUserData={NporsUserData}></NPORSUserData>)
                                    }

                                </tbody>
                            </table>
                        </div>
                }

            </div>

        </div>
    );
};

export default NPORSUserAllInformation;

{/* Loading Overlay: শুধুমাত্র isLoading true হলেই দেখাবে */}
// <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all duration-500">
//     <div className="relative p-10 bg-white rounded-[40px] shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 border border-slate-100">
        
//         {/* ১. এনিমেটেড স্পিনার এবং আইকন */}
//         <div className="relative w-24 h-24 mb-6">
//             {/* বাইরের হালকা সার্কেল */}
//             <div className="absolute inset-0 border-4 border-[#1E8F85]/10 rounded-full"></div>
            
//             {/* মেইন স্পিনানিং সার্কেল */}
//             <div className="absolute inset-0 border-4 border-t-[#1E8F85] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            
//             {/* ভেতরের উল্টো দিকে ঘোরা সার্কেল */}
//             <div className="absolute inset-3 border-4 border-b-[#146e66] border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-reverse opacity-70"></div>
            
//             {/* মাঝখানে টিক বা ক্লাউড আইকন */}
//             <div className="absolute inset-0 flex items-center justify-center">
//                 <svg className="w-8 h-8 text-[#1E8F85] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//             </div>
//         </div>

//         {/* ২. টেক্সট কন্টেন্ট */}
//         <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
//             Processing...
//         </h2>
//         <p className="text-slate-500 text-sm text-center font-medium px-4">
//             Please wait while we update your product and upload images.
//         </p>

//         {/* ৩. হরিজন্টাল প্রগ্রেস বার */}
//         <div className="w-full h-1.5 bg-slate-100 rounded-full mt-8 overflow-hidden relative">
//             <div className="h-full bg-gradient-to-r from-[#1E8F85] via-[#26c4b7] to-[#146e66] rounded-full animate-loading-bar shadow-[0_0_10px_rgba(30,143,133,0.5)]"></div>
//         </div>

//         {/* ৪. ছোট ডট এনিমেশন (নিচে) */}
//         <div className="flex gap-1.5 mt-4">
//             <div className="w-1.5 h-1.5 bg-[#1E8F85] rounded-full animate-bounce delay-100"></div>
//             <div className="w-1.5 h-1.5 bg-[#1E8F85] rounded-full animate-bounce delay-200"></div>
//             <div className="w-1.5 h-1.5 bg-[#1E8F85] rounded-full animate-bounce delay-300"></div>
//         </div>
//     </div>
// </div>