import React, { useEffect, useState } from 'react';
import "./EmailVerificationAlert.css"
import { Link, useLoaderData } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const EmailVerificationAlert = () => {

    // ========================================
    // Page will be start from top (Start)
    // ========================================
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    // ========================================
    // Page will be start from top (End)
    // ========================================



    return (
        <div className="EmailVerificationAlertParent mx-2 md:mx-0 py-2 ">

            <div className="EmailVerificationAlert mx-auto  w-[100%]  sm:w-[460px] my-4">
                <div className="SuccessIcon">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                </div>
                <h1>Verify Your Email and Log In Now! ✉️</h1>
                <p>Check your inbox and complete the email verification process to access your account. Without verification, login won’t be possible. Secure your account and unlock all the benefits MoneyFly has to offer! 🚀✨</p>

                <div className="SuccessPayInfoAll">

                    <div className="PayInfo flex items-center justify-between">
                        <h4>Verification email, then get</h4>
                        <h5>24 USD.</h5>
                    </div>

                </div>

                <a href="https://mail.google.com" target='_blank'
                    className=" mt-2 lg-mt-0 relative inline-flex items-center justify-center p-2 w-[100%] px-6 md:px-0 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#2DE29D] rounded-full shadow-md group">
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#2DE29D] group-hover:translate-x-0 ease">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Go Email ✉️</span>
                    <span class="relative invisible">Go Email  ✉️</span>
                </a>
            </div>

        </div>
    );
};

export default EmailVerificationAlert;