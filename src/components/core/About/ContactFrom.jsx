import React, { useEffect, useRef } from 'react'
import ContactUsForm from '../../common/ContactUsForm';
import HighlightText from '../HomePage/HighlightText';

const ContactFrom = () => {
    return (
        <div className='mx-auto w-full'>
            <h1 className='text-center text-3xl font-semibold'><HighlightText text={"Get in Touch"} /></h1>
            <p className='text-center text-[16px] font-normal text-richblack-300'>We’d love to here for you, Please fill out this form.</p>
            <div className='mt-[50px] flex lg:flex-row lg:justify-around'>
                <div className='flex w-full ml-0 xs:ml-3 sm:ml-4 md:ml-5 sm:justify-around md:justify-around lg:justify-evenly'>
                    <ContactUsForm />
                </div>

            </div>
        </div>
    )
}

export default ContactFrom;