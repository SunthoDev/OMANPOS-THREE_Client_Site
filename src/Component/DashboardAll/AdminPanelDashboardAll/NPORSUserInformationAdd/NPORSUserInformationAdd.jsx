import React, { useContext, useState } from 'react';
import "./NPORSUserInformationAdd.css"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useQuery } from "@tanstack/react-query";

const NPORSUserInformationAdd = () => {

    let [loadingLogin, setLoadingLogin] = useState(false)
    let [success, setSuccess] = useState("")
    let [error, setError] = useState("")

    // =======================================================

    // =======================================================
    // Student Admission all Information Send Database start
    // =======================================================
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    let onSubmit = (data) => {
        setLoadingLogin(true)
        setError("")
        setSuccess("")
        let date = moment().format("D/MM/YY , hh:mm A")
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let VerificationNo = '';
        // Generate 20 characters (without the static suffix)
        for (let i = 0; i < 24; i++) {
            VerificationNo += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        // Append the static suffix
        VerificationNo += '%3D%3D';
        // console.log(VerificationNo);

        let {
            TransactionNumber, PaymentID, TotalPayment, TransactionDate,

            DocumentType, ApplicantName, EmailId, PhoneNumber,

            VerifierName, VerificationStatus, VerificationDateTime,

            VerifyBy, VerifyAt, ApproverName, // <-- Added new fields
        } = data

        let allInfo = {

            TransactionNumber, PaymentID, TotalPayment, TransactionDate,

            DocumentType, ApplicantName, EmailId, PhoneNumber,

            VerifierName, VerificationStatus, VerificationDateTime,

            VerifyBy, VerifyAt, ApproverName, // <-- Added new fields

            date, VerificationNo
        }

        // console.log(allInfo)

        // save user Database 
        // ==========================
        fetch("https://server.docswallat.com/InsertUserInfo", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    reset()
                    setLoadingLogin(false)
                    setSuccess("User Information Add Successfully")
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User Information Add Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    // =======================================================
    // Student Admission all Information Send Database End
    // =======================================================
    const [isOpen, setIsOpen] = useState(false);

    // ১. ডাটাবেস থেকে ডেটা গেট করা
    const { data: userInfo = {}, refetch } = useQuery({
        queryKey: ["getWebsiteInfo"],
        queryFn: async () => {
            const res = await fetch("https://server.docswallat.com/getWebsiteInfo");
            return res.json();
        },
    });


    return (
        <div className='md:mx-20 mb-14 mt-8'>
            {/* Welcome Banner Update */}
            <div className="welcomeBanner relative overflow-hidden rounded-[2rem] shadow-2xl mx-4 md:mx-0 mb-12 group">
                <div className="overlay bg-gradient-to-r from-slate-900/80 to-[#1E8F85]/60 backdrop-blur-sm p-12 flex flex-col items-center justify-center border border-white/10">
                    <h2 className="text-[32px] md:text-[48px] font-black text-white tracking-[4px] text-center drop-shadow-lg group-hover:scale-105 transition-transform duration-500">
                        DOCSWALLET DATA ENTRY
                    </h2>
                    <div className="w-24 h-1.5 bg-[#1E8F85] rounded-full mt-4 shadow-[0_0_15px_#1E8F85]"></div>
                </div>
            </div>

            {/* User information update !! */}
            <div className="pb-4">
                {/* ওপেন বাটন */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Info
                </button>

                {/* মোডাল ডিজাইন */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-2xl shadow-xl w-96 relative">
                            <h3 className="text-xl font-bold mb-4">User Information</h3>

                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.target;
                                const name = form.name.value;
                                const email = form.email.value;
                                const updatedData = { name, email };

                                // ২. API কল (PUT Request)
                                const response = await fetch("https://server.docswallat.com/AdminUpdateWebsiteInfo", {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(updatedData),
                                });

                                const result = await response.json();
                                if (result.acknowledged) {
                                    Swal.fire("সফল!", "তথ্য আপডেট হয়েছে।", "success");
                                    setIsOpen(false);
                                    refetch(); // ডাটা রিফেচ করে ইনপুট ফিল্ড আপডেট করা
                                }
                            }} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={userInfo?.name || ""}
                                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={userInfo?.email || ""}
                                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* User information add bellow !! */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white/50 backdrop-blur-md p-6 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">

                <div className='AllToyData grid mx-4 md:mx-0 md:grid-cols-2 gap-x-10 gap-y-8'>

                    {/* Transaction Number */}
                    <div className="form-control group">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Transaction Number</span>
                        </label>
                        <div className="relative flex items-center">
                            <input type="text" name='TransactionNumber'
                                {...register("TransactionNumber", { required: true })}
                                placeholder="Transaction Number"
                                className="input input-bordered focus:input-accent w-full bg-white rounded-xl border-slate-200 h-[55px] font-medium transition-all focus:shadow-[0_0_20px_rgba(30,143,133,0.1)]" />
                        </div>
                    </div>

                    {/* Payment ID */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Payment ID</span>
                        </label>
                        <input type="Number" name='PaymentID'
                            {...register("PaymentID", { required: true })}
                            placeholder="Payment ID"
                            className="input input-bordered focus:input-accent w-full bg-white rounded-xl border-slate-200 h-[55px] font-medium" />
                    </div>

                    {/* Total Payment */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Total Payment</span>
                        </label>
                        <input type="text" name='TotalPayment'
                            {...register("TotalPayment", { required: true })}
                            defaultValue="OMR 45.75"
                            className="input input-bordered focus:input-accent w-full bg-slate-50 border-slate-200 h-[55px] font-bold text-[#1E8F85]" />
                    </div>

                    {/* Transaction Date */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Transaction Date</span>
                        </label>
                        <input type="text" name='TransactionDate'
                            {...register("TransactionDate", { required: true })}
                            placeholder="Transaction Date"
                            className="input input-bordered focus:input-accent w-full bg-white rounded-xl border-slate-200 h-[55px]" />
                    </div>

                    {/* Document Type */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Document Type</span>
                        </label>
                        <select
                            {...register("DocumentType", { required: true })}
                            className="select select-bordered select-accent w-full bg-white rounded-xl border-slate-200 h-[55px] font-medium"
                            name='DocumentType'
                        >
                            <option>Commercial registration</option>
                            <option>Marriage certificate</option>
                            <option>Attestation of Police clerance</option>
                            <option>Civil Document- ID Card Driving license birth certificate passport</option>
                            <option>Trade agencies /original</option>
                            <option>Duplicate copy trade agencies</option>
                            <option>Trade contracts /original</option>
                            <option>Duplicate copy trade contracts</option>
                            <option>Certificate of origin /original</option>
                            <option>Trade invoice From (1) to $10,000</option>
                            <option>Trade invoice From $10,000 to $50,000</option>
                            <option>Trade invoice From $50,000 to $100,000</option>
                            <option>Trade invoice Above from $100,000</option>
                            <option>Marriage certificate</option>
                            <option>Divorce certificate</option>
                            <option>Declaration of freedom from a wife</option>
                            <option>Other commercial Document</option>
                            <option>Chamber of commerce and industry membership</option>
                            <option>Cargo manifest</option>
                            <option>Closing accounts of companies</option>
                            <option>Plans of companies’ projects</option>
                            <option>Certificate of military equipment utilization</option>
                            <option>Certificate of analysis of nutrients in foods</option>
                            <option>Replacement of Lost Documents Commercial</option>
                            <option>An employment certificate</option>
                            <option>Civil Contracts - Other Statutory Agencies (Original Copy)</option>
                            <option>Civil contracts - other regular agency - true copy</option>
                            <option>Civil contracts - academic certificate - original copy</option>
                            <option>Death certificate for Omanis who died outside the Sultanate</option>
                            <option>Attestation of Death certificate</option>
                            <option>Attestation of experience certificate</option>
                            <option>Educational certificates (Omani students abroad) - Original</option>
                            <option>Educational certificates (Omani students abroad) - Copy</option>
                            <option>Medical certificates abroad - original</option>
                            <option>Medical certificates abroad - true copy</option>
                            <option>Replace lost civil documents</option>
                            <option>Apostille (Civil Documents Only)</option>
                            <option>Laboure clearances</option>
                            <option>Attestation of Police clearance</option>
                            <option>Civil Document - ID, License, Birth, Passport</option>
                            <option>Education Certificate Original Copy</option>
                            <option>Medical Report</option>
                            <option>Diplomatic Delegation Category within Oman</option>
                            <option>Social Security Category for Civil document Only</option>
                        </select>
                    </div>

                    {/* Applicant Name */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Applicant Name</span>
                        </label>
                        <textarea
                            name="ApplicantName"
                            {...register("ApplicantName", { required: true })}
                            defaultValue={userInfo?.name}
                            rows={2}
                            className="textarea textarea-bordered focus:textarea-accent w-full bg-white rounded-xl border-slate-200 min-h-[40px]"
                        />
                    </div>

                    {/* Email Id */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Email Id</span>
                        </label>
                        <input type="text" name='EmailId'
                            {...register("EmailId", { required: true })}
                            defaultValue={userInfo?.email}
                            className="input input-bordered focus:input-accent w-full bg-white rounded-xl border-slate-200 h-[55px]" />
                    </div>

                    {/* Phone Number */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Phone Number</span>
                        </label>
                        <input type="text" name='PhoneNumber'
                            {...register("PhoneNumber", { required: true })}
                            defaultValue="92579476"
                            className="input input-bordered focus:input-accent w-full bg-white rounded-xl border-slate-200 h-[55px]" />
                    </div>

                    {/* Verifier Name */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Verifier Name</span>
                        </label>
                        <input type="text" name='VerifierName'
                            {...register("VerifierName", { required: true })}
                            defaultValue="Foreign Ministry - Oman"
                            className="input input-bordered focus:input-accent w-full bg-white rounded-xl border-slate-200 h-[55px]" />
                    </div>

                    {/* Verification Status */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Verification Status</span>
                        </label>
                        <input type="text" name='VerificationStatus'
                            {...register("VerificationStatus", { required: true })}
                            defaultValue="Approved"
                            className="input input-bordered focus:input-accent w-full bg-emerald-50 border-emerald-100 text-emerald-700 h-[55px] font-bold shadow-inner" />
                    </div>

                    {/* Verification Date & Time */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Verification Date & Time</span>
                        </label>
                        <input type="text" name='VerificationDateTime'
                            {...register("VerificationDateTime", { required: true })}
                            placeholder="Verification Date & Time"
                            className="input input-bordered focus:input-accent w-full bg-white rounded-xl border-slate-200 h-[55px]" />
                    </div>

                    {/* Verify By */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Verify By</span>
                        </label>
                        <input type="text" name='VerifyBy'
                            {...register("VerifyBy", { required: true })}
                            defaultValue="Salah 1"
                            className="input input-bordered focus:input-accent w-full bg-white rounded-xl border-slate-200 h-[55px]" />
                    </div>

                    {/* Verify At */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Verify At</span>
                        </label>
                        <input type="text" name='VerifyAt'
                            {...register("VerifyAt", { required: true })}
                            defaultValue="Salalah"
                            className="input input-bordered focus:input-accent w-full bg-white rounded-xl border-slate-200 h-[55px]" />
                    </div>

                    {/* Approver Name */}
                    <div className="form-control">
                        <label className="label pb-2">
                            <span className="ToyName label-text font-bold text-slate-700 uppercase tracking-wider text-xs">Approver Name</span>
                        </label>
                        <input type="text" name='ApproverName'
                            {...register("ApproverName", { required: true })}
                            defaultValue="Sumaiyaa AI Balushi"
                            className="input input-bordered focus:input-accent w-full bg-white rounded-xl border-slate-200 h-[55px]" />
                    </div>
                </div>

                {/* Status Messages */}
                <div className="mt-10 text-center">
                    {success && <h3 className='text-[#1E8F85] text-[20px] font-bold animate-bounce bg-emerald-50 py-3 rounded-full border border-emerald-100'>{success}</h3>}
                    {error && <h3 className='text-[#f93333] text-[15px] font-semibold bg-red-50 py-3 rounded-full border border-red-100 mt-2'>{error}</h3>}
                </div>

                {/* Submit Button */}
                <button
                    disabled={loadingLogin}
                    type="submit"
                    className="group relative overflow-hidden btn border-none text-white bg-gradient-to-r from-[#1E8F85] to-[#166961] w-full mt-10 h-[65px] rounded-2xl text-lg font-black tracking-widest shadow-xl shadow-[#1E8F85]/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {loadingLogin ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            "ADD USER INFORMATION"
                        )}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                </button>

            </form>
        </div>
    );
};

export default NPORSUserInformationAdd;


