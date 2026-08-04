import React, { useState, useEffect } from 'react';
import "./Singup.css"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';




const SingUp = () => {

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


    // ================================================

    let [xx, setXx] = useState(true)
    let [btnDisable, setBtnDisable] = useState(false)

    // ================================================

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let { createUser, logOutUser } = useContext(AuthContext)
    // let { } = useContext(AuthContext)

    let [success, setSuccess] = useState("")
    let [error, setError] = useState("")
    let navigate = useNavigate()
    // console.log(UserReferUseAccount)

    // ========================================
    // User Save Database 
    // ========================================

    let onSubmit = (data) => {
        setError("")
        setSuccess("")
        setBtnDisable(true)
        let FirstName = data.FirstName
        let LastName = data.LastName
        let Email = data.email
        let Password = data.password
        let confirmPassword = data.confirmPassword
        let date = moment().format("MM/D/YY , hh:mm A")
        // console.log(UserReferUseAccount)

        if (Password !== confirmPassword) {
            setError("Don't match your password, try carefully")
            reset()
            setBtnDisable(false)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Don't match your password, try carefully !!",
                showConfirmButton: false,
                timer: 1500
            })
            return
        }
        // console.log(allData)


        createUser(Email, Password)
            .then(result => {
                let createUser = result.user
                // console.log(createUser)

                // user Update 
                // =========================
                updateProfile(createUser, { displayName: FirstName })
                    .then(() => {
                        let saveUser = {
                            name: createUser.displayName, LastName: LastName, Password, email: createUser.email,

                            userId: Math.round(Math.random() * 99999999).toString(), role: "user", date
                        }
                        // console.log(saveUser) 

                        // save user DB 
                        // ========================
                        fetch("https://server.docswallat.com/users", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data)
                                if (data.insertedId) {

                                    setSuccess(" Your SingUp Successfully ")
                                    reset()
                                    setBtnDisable(false)

                                    // LogOut User 
                                    // ========================
                                    logOutUser()
                                        .then(result => {
                                            navigate("/Login")
                                        })
                                }
                            })
                    })
                    .catch(error => {
                        setError(error.message)
                        reset()
                        setBtnDisable(false)
                    })
            })
            .catch(error => {
                // console.log(error.message)
                setError("you email is already used, Please try another gmail.")
                reset()
                setBtnDisable(false)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "you email is already used, Please try another gmail !!",
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }


    return (
        <div className='SingUpParent'>

            <div className='SingUp mx-2 md:mx-0 pt-[20px] md:pt-[40px] pb-[20px]'>

                <div className='MaineCard w-[100%] lg:w-[440px] mx-auto rounded-[4px] '>

                    <h2 className='text-[27px] font-[500] text-black pt-[28px] text-center'>Create an account Singup</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className='FromData px-3 md:px-[20px]' >

                        <div className="">
                            <div className='relative'>
                                <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='First Name' type="text" {...register("FirstName", { required: true })} name='FirstName' />
                                <h4 className='absolute font-[600] top-[34px] right-[22px] text-[18px]'><i class="fa fa-user" aria-hidden="true"></i></h4>
                                {errors.FirstName && <span className='text-red-600  font-semibold'>Your First Name is required</span>}
                            </div>
                            <div className='relative'>
                                <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='Last Name' type="text" {...register("LastName", { required: true })} name='LastName' />
                                <h4 className='absolute font-[600] top-[34px] right-[22px] text-[18px]'><i class="fa fa-user" aria-hidden="true"></i></h4>
                                {errors.LastName && <span className='text-red-600 font-semibold'>Your Last Name is required</span>}
                            </div>
                        </div>
                        <div className='relative'>
                            <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='Email' type="email" {...register("email", { required: true })} name='email' />
                            <h4 className='absolute font-[600] top-[34px] right-[22px] text-[18px]'>@</h4>
                            {errors.email && <span className='text-red-600 font-semibold'>Your Email  is required</span>}
                        </div>
                        <div className="">
                            <div className='relative'>
                                <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='Password' type={xx == true ? "password" : "text"} name='password'
                                    {...register("password",
                                        {
                                            required: true,
                                        })}
                                />
                                <button onClick={() => setXx(!xx)} className='absolute top-[34px] right-[22px] text-[18px]'>
                                    <i className={xx === true ? "fa fa-lock" : "fa fa-unlock"} aria-hidden="true"></i>
                                </button>

                                {errors.password?.type === "required" && <span className='text-red-600 font-semibold'>Password field is required</span>}
                            </div>

                            <div className='relative'>
                                <input className='mt-[23px] text-black text-[14px] font-[600] rounded-[6px] py-[14px] px-[24px] w-[100%]' placeholder='Confirm Password' type={xx == true ? "password" : "text"}    {...register("confirmPassword", { required: true })} name='confirmPassword' />
                                <button onClick={() => setXx(!xx)} className='absolute top-[34px] right-[22px] text-[18px]'>
                                    <i className={xx === true ? "fa fa-lock" : "fa fa-unlock"} aria-hidden="true"></i>
                                </button>

                                {errors.confirmPassword && <span className='text-red-600 font-semibold'>Your confirmPassword  is required</span>}
                            </div>

                        </div>




                        {/* ============================ */}
                        <h3 className='text-[#22afa3] text-[26px] font-[500] py-[6px]'>{success}</h3>
                        <h3 className='text-[#f93333] text-[15px] font-[500] py-[6px]'>{error}</h3>


                        {/* ======================== */}
                        <button disabled={btnDisable} className='Register mt-[4px] w-[100%] bg-[#0171D3] py-[10px] rounded-[7px] text-white text-[18px] font-[600]' type="submit">{btnDisable ? "Loading..." : "Register Now"}</button>

                        {/* ========================= */}
                        <h3 className="mt-[23px] mb-[18px] text-[14px] font-[400] text-[#22afa3] ">Already have an account? <Link className='text-[#f93333] text-[15px] font-[500] ' to="/Login">Login</Link></h3>

                    </form>


                </div>

            </div>

        </div>
    );
};

export default SingUp;






