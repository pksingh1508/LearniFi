import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../core/HomePage/Button';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/api';
import { toast } from 'react-hot-toast';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging data: ", data);
        try {
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = { status: "OK" };
            console.log("Logging response: ", response);
            toast.success("Message send Successfully");
            setLoading(false);
        } catch (err) {
            console.log("Error ", err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phonenumber: ""
            })
        }
    }, [reset, isSubmitSuccessful]);



    return (
        <form onSubmit={handleSubmit(submitContactForm)} className='bg-[#191E35] p-3 rounded-lg'>
            <div className='flex gap-2'>

                {/* FirstName */}
                <div className='flex flex-col'>
                    <label htmlFor="firstname" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>First Name<sup className="text-pink-200">*</sup></label>
                    <input
                        type="text"
                        name='firstname'
                        id='firstname'
                        placeholder='First Name'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        {...register("firstname", { required: true })}
                    />
                    {
                        errors.firstname && (
                            <span>Please enter your first name</span>
                        )
                    }
                </div>

                {/* LastName */}
                <div className='flex flex-col'>
                    <label htmlFor="lastname" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Last Name<sup className="text-pink-200">*</sup></label>
                    <input
                        required
                        type="text"
                        name='lastname'
                        id='lastname'
                        placeholder='Last Name'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        {...register("lastname")}
                    />
                </div>
            </div>

            {/* email */}
            <div className='flex flex-col mb-1 mt-3'>
                <label htmlFor="email" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email<sup className="text-pink-200">*</sup></label>
                <input
                    type="email"
                    name='email'
                    id='email'
                    placeholder='Enter Email'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    {...register("email", { required: true })}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* phone number */}
            <div className='flex flex-col gap-2 mt-3'>
                <label htmlFor="phonenumber" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Phone Number<sup className="text-pink-200">*</sup></label>
                <div className='flex gap-3'>
                    {/* dropdown */}
                    <select
                        name="dropdown"
                        id="dropdown"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        // className='bg-black w-[7rem]'
                        className="w-[10rem] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        {...register("countrycode", { required: true })}
                    >
                        {
                            CountryCode.map((element, index) => {
                                return (
                                    <option key={index} value={element.code} className='text-white'>{element.code} -{element.country}</option>
                                )
                            })
                        }
                    </select>

                    <div className='w-full'>
                        <input
                            type="number"
                            name="phonenumber"
                            id='phonenumber'
                            placeholder='Enter phone number'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            {...register("phonenumber",
                                {
                                    required: { value: true },
                                    maxLength: { value: 10, message: "Invalid phone number" },
                                    minLength: { value: 8, message: "Invalid phone number" },
                                })}
                        />
                        {
                            errors.phonenumber && (
                                <span>
                                    {errors.phonenumber.message}
                                </span>
                            )
                        }
                    </div>

                </div>

            </div>

            {/* message box */}
            <div className='flex flex-col mt-2'>
                <label htmlFor="message" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Message</label>
                <textarea name="message" id="message" cols="30" rows="7" placeholder='Enter your message Here' style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    {...register("message", { required: true })}
                />
                {
                    errors.message && (
                        <span>
                            Please enter your message here
                        </span>
                    )
                }
            </div>

            {/* Button */}
            <div className='flex items-center mx-auto mt-3'>
                <button
                    type='submit'
                    className="text-center text-[13px] px-6 py-3 rounded-md font-bold bg-[#003FFE] text-white hover:scale-95 transition-all duration-200"
                >Send Message</button>
            </div>

        </form>
    )
}

export default ContactUsForm;