import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [confirmationModal, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div>

            <div className='relative flex w-[80px] lg:min-w-[222px] flex-col border-r-[1px] border-richblack-800 h-[calc(100vh-3.5rem)] py-10'>
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type) return null;
                            return (
                                <SidebarLink link={link} iconName={link.icon} key={link.id} />
                            )
                        })
                    }
                </div>

                <div className='mx-auto mt-6 mb-6 h-[1px] w-[70px] lg:min-w-[212px] bg-richblack-600'></div>

                <div className='flex flex-col gap-3'>
                    <SidebarLink link={{ name: "Setting", path: "dashboard/setting" }} iconName="VscSettingsGear" />

                    <button
                        onClick={() => setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out ?",
                            btn1Text: "LogOut",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null)
                        })}
                        className='text-sm font-medium text-richblack-5 ml-8'
                    >
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className="lg:text-lg" />
                            <span className='hidden lg:block'>Logout</span>
                        </div>
                    </button>
                </div>


            </div>

            <div className='absolute top-[45%] left-[45%]'>
                {
                    confirmationModal && <ConfirmationModal modalData={confirmationModal} />
                }
            </div>

        </div>
    )
}

export default Sidebar;