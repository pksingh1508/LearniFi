import React from 'react'
import { AiFillWechat } from 'react-icons/ai';
import { BsGlobeAmericas } from 'react-icons/bs';
import { PiPhoneCall } from 'react-icons/pi';
import ContactUsForm from '../components/common/ContactUsForm';
import HighlightText from '../components/core/HomePage/HighlightText';
import Footer from '../components/core/Footer1';
import ReviewSlider from "../components/common/ReviewSlider";

const Contact = () => {

    return (
        <div>
            <section className='w-11/12 max-w-maxContent flex mx-auto'>
                <div className='flex lg:flex-row md:flex-row flex-col xs:items-center w-full justify-around mt-16'>
                    {/* left div */}
                    <div className='text-white bg-richblack-800 h-fit w-fit p-7 rounded-[14px] flex flex-col gap-4 flex-wrap'>
                        <div className='flex gap-2 lg:p-7'>
                            <div className='mt-1'><AiFillWechat /></div>
                            <div>
                                <h2>Chat on us</h2>
                                <p className='text-[14px] text-richblack-200 font-normal'>Our friendly team is here to help.</p>
                                <p className='text-[14px] text-richblack-200 font-normal'>@mail address</p>
                            </div>
                        </div>
                        <div className='flex gap-2 lg:p-7'>
                            <div className='mt-1'><BsGlobeAmericas /></div>
                            <div>
                                <h2>Visit us</h2>
                                <p className='text-[14px] text-richblack-200 font-normal'>Come and say hello at our office HQ.</p>
                                <p className='text-[14px] text-richblack-200 font-normal'>Here is the location/ addresss</p>
                            </div>
                        </div>
                        <div className='flex gap-2 lg:p-7'>
                            <div className='mt-1'><PiPhoneCall /></div>
                            <div>
                                <h2>Call us</h2>
                                <p className='text-[14px] text-richblack-200 font-normal'>Mon - Fri From 8am to 5pm</p>
                                <p className='text-[14px] text-richblack-200 font-normal'>+123 456 7890</p>
                            </div>
                        </div>
                    </div>
                    {/* Right div */}
                    <div className='text-white flex flex-col gap-2 lg:w-[45%] md:w-[54%] xs:mt-5 md:mt-5 xs:p-4 md:p-7 border-[1px] border-richblack-300 lg:p-[40px] rounded-[15px]'>
                        <p className='text-3xl font-semibold'><HighlightText text={"Got a Idea? We’ve got the skills. Let’s team up"} /></p>
                        <p className='text-[14px] text-richblack-200 font-normal'>Tall us more about yourself and what you’re got in mind.</p>
                        <ContactUsForm />
                    </div>
                </div>
            </section>

            {/* review slider */}
            <section className='w-11/12 max-w-maxContent mx-auto mt-[100px]'>
                <h1 className='text-3xl font-semibold text-center'><HighlightText text={"Reviews from other learners"} /></h1>
                <ReviewSlider />
            </section>

            {/* footer */}
            <section>
                <Footer />
            </section>
        </div>
    )
}

export default Contact;