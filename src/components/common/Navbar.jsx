import React, { useEffect, useState } from 'react'
import Logo from '../../assets/icons/icons8-circled-l-50.png';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/api';
import { AiOutlineDown } from "react-icons/ai";

const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const [subLinks, setSubLinks] = useState([]);

    const getSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Print the sublinks result ", result);
            setSubLinks(result.data.data);
        } catch (e) {
            console.log("Could not get sublinks");
        }
    }

    useEffect(() => {
        getSubLinks();
    }, [])

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-14 items-center bg-richblue-500 justify-center border-b-[1px] border-richblack-200'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* Image added */}
                <Link to={"/"} className='flex gap-2 items-center'>
                    <img src={Logo} alt="LearniFi" loading='lazy' className='rounded-[50%]' />
                    <p className='text-white text-[1.6rem] font-bold font-mono'>LearniFi</p>
                </Link>
                {/* Nav Links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => {
                                return (
                                    <li key={index}>
                                        {
                                            link.title === 'Catalog' ?
                                                (
                                                    <div className='flex gap-2 items-center group relative'>
                                                        <p>{link.title}</p>
                                                        <AiOutlineDown />

                                                        <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[10%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 z-20 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                                                            {
                                                                subLinks.length ?
                                                                    (
                                                                        subLinks.map((subLink, index) => {
                                                                            return (
                                                                                <Link key={index} className='text-xl px-3' to={`/catalog/${subLink.name
                                                                                    .split(" ")
                                                                                    .join("-")
                                                                                    .toLowerCase()}`}>
                                                                                    {subLink.name}
                                                                                </Link>
                                                                            )
                                                                        })
                                                                    )
                                                                    : (<div></div>)
                                                            }

                                                            <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'></div>

                                                        </div>
                                                    </div>
                                                ) :
                                                (
                                                    <Link to={link?.path}>
                                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link.title}</p>
                                                    </Link>
                                                )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* login signup dashboard button */}

                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to={"/dashboard/cart"} className='relative text-white'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"} >
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>Login</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>Signup</button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>
            </div>



        </div>
    )
}

export default Navbar;