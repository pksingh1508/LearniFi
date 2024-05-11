import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from "../../common/IconButton";
import { BiEdit } from 'react-icons/bi';
import { formattedDate } from "../../../utils/dateFormatter";

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className='text-richblack-5 w-full flex flex-col mx-auto pl-4 xl:items-center gap-4 flex-wrap'>
            <h1 className='flex w-[70%] justify-start font-semibold'>My Profile</h1>

            {/* section 1 */}
            <div className='flex w-full md:justify-between md:items-center lg:justify-between lg:items-center rounded-[0.5rem] bg-richblack-800 px-[3rem] py-2 flex-col lg:flex-row'>
                <div className='flex lg:flex-row flex-col gap-7 p-2 '>
                    <img src={user?.image} alt={`profile-${user?.firstName}`}
                        className='aspect-square w-[78px] rounded-full object-cover'
                    />
                    <div className='flex flex-col gap-1 justify-center'>
                        <p>{user?.firstName + " " + user?.lastName}</p>
                        <p className='text-[15px] text-richblack-300'>{user?.email}</p>
                    </div>
                </div>
                <div className='flex items-center gap-1 bg-[#1547E0] w-fit h-fit px-3 py-1 text-black font-semibold rounded-md cursor-pointer'>
                    <IconButton
                        onclick={() => navigate("/dashboard/setting")}
                    >Edit</IconButton>
                    <BiEdit onClick={() => navigate("/dashboard/setting")} />
                </div>
            </div>


            {/* Section 2 */}
            <div className='flex w-full md:justify-between md:items-center lg:justify-between lg:items-center rounded-[0.5rem] bg-richblack-800 px-[3rem] py-4 gap-4 flex-col lg:flex-row'>
                <div className='flex flex-col justify-between gap-4'>
                    <p>About</p>
                    <p className='text-richblack-300 text-[16px]'>{user?.additionalDetails?.about ?? "Write Something about yourself"}</p>
                </div>
                <div className='flex items-center gap-1 bg-[#1547E0] w-fit h-fit px-3 py-1 text-black font-semibold rounded-md cursor-pointer'>
                    <IconButton
                        onclick={() => navigate("/dashboard/setting")}
                    >Edit</IconButton>
                    <BiEdit onClick={() => navigate("/dashboard/setting")} />
                </div>
            </div>

            {/* Section 3 */}
            <div className='flex flex-col gap-4 w-full rounded-[0.5rem] bg-richblack-800 px-[3rem] mt-3 py-6'>
                <div className='flex xs:flex-col sm:flex-row gap-2 sm:justify-between md:justify-between'>
                    <p>Personal Details</p>
                    <div className='flex items-center gap-1 w-fit bg-[#1547E0] h-fit px-3 py-1 text-black font-semibold rounded-md cursor-pointer'>
                        <IconButton
                            onclick={() => navigate("/dashboard/setting")}
                        >Edit</IconButton>
                        <BiEdit onClick={() => navigate("/dashboard/setting")} />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row justify-start lg:justify-between gap-[4rem]'>
                    <div className='flex flex-col gap-3'>
                        <div>
                            <p className='text-richblack-300 text-[1rem]'>First Name</p>
                            <p>{user?.firstName}</p>
                        </div>
                        <div>
                            <p className='text-richblack-300 text-[1rem]'>Email</p>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <p className='text-richblack-300 text-[1rem]'>Gender</p>
                            <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                        </div>
                    </div>
                    <div className='lg:ml-5 flex flex-col gap-3'>
                        <div>
                            <p className='text-richblack-300 text-[1rem]'>Last Name</p>
                            <p>{user?.lastName}</p>
                        </div>
                        <div>
                            <p className='text-richblack-300 text-[1rem]'>Phone Number</p>
                            <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                                    "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default MyProfile;