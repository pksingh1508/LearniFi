import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import { LiaLongArrowAltLeftSolid } from 'react-icons/lia';

const UpdatePassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate));
    }

    return (
        <div className='text-white flex justify-center items-center w-[100vw] h-[80vh]'>
            {
                loading ?
                    (
                        <div>Loading...</div>
                    )
                    :
                    (
                        <div className='w-[25vw] flex flex-col gap-1'>
                            <h1 className='text-2xl'>Choose new Password</h1>
                            <p className='text-[14px] text-richblack-300'>Almost done. Enter your new password and youre all set.</p>
                            <form onSubmit={handleOnSubmit}>
                                <label className='relative'>
                                    <p className="mb-1 mt-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        New Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder='New Password'
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                    />
                                    <span onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-[45px] z-[10] cursor-pointer"
                                    >
                                        {
                                            showPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24} />
                                        }
                                    </span>
                                </label>

                                <label className='relative'>
                                    <p className="mb-1 mt-4 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        Confirm New Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        name='confirmPassword'
                                        value={confirmPassword}
                                        onChange={handleOnChange}
                                        placeholder='Confirm Password'
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                    />
                                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-[5.5rem] z-[10] cursor-pointer"
                                    >
                                        {
                                            showConfirmPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24} />
                                        }
                                    </span>
                                </label>
                                <button type='submit'
                                    className='w-full mt-6 text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200'
                                >
                                    Reset Password
                                </button>
                            </form>

                            <div className='ml-3 mt-2'>
                                <Link to={"/login"} className='flex items-center gap-2'>
                                    <LiaLongArrowAltLeftSolid />
                                    <p className='text-[15px]'>Back to Login</p>
                                </Link>
                            </div>
                        </div>
                    )

            }
        </div>
    )
}

export default UpdatePassword;