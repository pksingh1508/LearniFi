import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPasswordResetToken, sendOtp } from '../services/operations/authAPI';
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";

const ForgetPassword = () => {

    const gradientStyle = {
        background: 'linear-gradient(117.95deg, #833AB4, #FD1D1D, #FCB045)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    };


    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='text-white flex justify-center items-center w-[100vw] h-[80vh]'>
            {
                loading ?
                    (<div>
                        Loading...
                    </div>)
                    :
                    (<div className='w-[25vw] flex flex-col gap-4'>
                        <h1 className='text-3xl font-semibold' style={gradientStyle}>
                            {
                                !emailSent ? "Reset Your Password" : "Check your Email"
                            }
                        </h1>
                        <p className='text-[14px] text-richblack-300'>
                            {
                                !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label>
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                            Email Address <sup className="text-pink-200">*</sup>
                                        </p>
                                        <input
                                            required
                                            type="text"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter email address"
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }}
                                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                        />
                                    </label>
                                )
                            }
                            <button
                                className='w-full mt-6 text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200'
                                type='submit'>
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        </form>


                        <div className='ml-3'>
                            <Link to={"/login"} className='flex items-center gap-2'>
                                <LiaLongArrowAltLeftSolid />
                                <p className='text-[15px]'>Back to Login</p>
                            </Link>
                        </div>

                    </div>)
            }
        </div>
    )
}

export default ForgetPassword;