import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,sendEmailVerification } from "firebase/auth";
import app from '../Firevase/Firebase.config';

export let AuthContext = createContext()

let AuthProvider = ({ children }) => {

    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true)
    let auth = getAuth(app)


    // console.log(user)

    // singUP function 
    let createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // observed user
    useEffect(() => {
        let unSubscribe = onAuthStateChanged(auth, (observedUser => {
            setUser(observedUser)
            setLoading(false)
            // console.log(observedUser)

        }))
        return () => {
            unSubscribe()
        }
    }, [])

    // login user 
    let loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //logOut user
    let logOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    //Password reset email
    let PasswordResetAllUser = (emailValue) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, emailValue)
    }
    //User verification
    let EmailVerificationUser = (currentUser) => {
        setLoading(true)
        return sendEmailVerification(currentUser)
    }

    // ===================================
    // Some Information Pass
    // ===================================

    // Deposit payment data transfoare
    let [BinancePaymentInfo, setBinancePaymentInfo] = useState([])
    let [BitGetPaymentInfo, setBitGetPaymentInfo] = useState([])
    let [WithdrawPaymentInfo, setWithdrawPaymentInfo] = useState([])
    let [PhonePaymentInfo, setPhonePaymentInfo] = useState([])
    // Subscription price data transfoare
    let [subscriptionPrice, setSubscriptionPrice] = useState([])



    //auth Info Provider
    let authInfo = {
        // ------------------------------------------
        // Authencation data transfoare Start 
        // ------------------------------------------
        user,
        createUser,
        loginUser,
        logOutUser,
        loading,
        PasswordResetAllUser,
        EmailVerificationUser,
        // ------------------------------------------
        // Authencation data transfoare End 
        // ------------------------------------------

        // ----------------------------------------------
        // Product or other data value transfoare Start 
        // ----------------------------------------------
        BinancePaymentInfo,
        setBinancePaymentInfo,
        BitGetPaymentInfo,
        setBitGetPaymentInfo,
        PhonePaymentInfo,
        setPhonePaymentInfo,
        WithdrawPaymentInfo,
        setWithdrawPaymentInfo,

        subscriptionPrice,
        setSubscriptionPrice
        // ----------------------------------------------
        // Product or other data value transfoare End 
        // ----------------------------------------------
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;