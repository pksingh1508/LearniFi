import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { PiClockCounterClockwiseBold } from "react-icons/pi";


const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const { signupData, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

    return (
        <div className='text-white flex w-[100vw] h-[80vh] items-center justify-center'>
            {
                loading
                    ?
                    (<div>Loading...</div>)
                    :
                    (<div className='w-[25vw] flex flex-col gap-3'>
                        <h1 className='text-3xl text-richblack-5 font-bold '>Verify Email</h1>
                        <p className='text-[14px] text-richblack-300'>A verification code has been sent to you. Enter the code below</p>
                        <form onSubmit={handleOnSubmit}>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                containerStyle={"flex justify-between"}
                                renderInput={(props) => <input {...props} />}
                                inputStyle={'bg-richblack-400 text-richblack-5 text-[30px] rounded-[10px]'}
                            />

                            <button type='submit'
                                className='w-full mt-6 text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200'
                            >
                                Verify Email
                            </button>
                        </form>


                        <div className='flex justify-between'>
                            <div className='ml-3'>
                                <Link to={"/login"} className='flex items-center gap-2'>
                                    <LiaLongArrowAltLeftSolid />
                                    <p className='text-[15px]'>Back to Login</p>
                                </Link>
                            </div>
                            <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                                className='flex gap-1 items-center text-[15px] text-blue-100'
                            >
                                <PiClockCounterClockwiseBold />
                                <p>Resend OTP</p>
                            </button>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default VerifyEmail;