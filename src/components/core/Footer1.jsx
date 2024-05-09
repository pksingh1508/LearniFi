import React from 'react'
import Logo from '../../assets/icons/icons8-circled-l-50.png';
import { Link } from 'react-router-dom';

const Footer1 = () => {
    return (
        <div className='mx-[3rem] sm:px-8 bg-richblue-900 rounded-lg flex sm:flex-row sm:gap-0 gap-8 flex-col justify-evenly items-center sm:h-[14rem] h-fit py-4'>
            <div className='px-4'>
                <Link to={"/"} className='flex md:flex-row flex-col gap-2 items-center'>
                    <img src={Logo} alt="LearniFi" loading='lazy' className='rounded-[50%]' />
                    <p className='text-white text-[1.6rem] font-bold font-mono'>LearniFi</p>
                </Link>
            </div>
            <div className='flex sm:flex-row flex-col gap-8'>
                <div className='flex flex-col gap-1 text-white'>
                    <p className='text-white text-[1.3rem] font-mono font-bold'>Quick Links</p>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/contact"}>Contact Us</Link>
                </div>
                <div className='flex flex-col gap-2 text-white'>
                    <p className='text-white text-[1.3rem] font-mono font-bold'>Legal</p>
                    <Link to={"/privacy"}>Privacy Policy</Link>
                    <Link to={"/term-use"}>Terms of use</Link>
                    <Link to={"/term-use"}>Refund & Cancellation Policy</Link>
                </div>
            </div>
            <div className='text-white'>
                <p className='text-white text-[1.3rem] font-mono font-bold'>Get In Touch</p>
                <p>support@LearniFi.in</p>
            </div>
        </div>
    )
}

export default Footer1;