import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText';
import BannerImage from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Qutoe from '../components/core/About/Qutoe';
import FoundingStory from '../assets/Images/FoundingStory.png';
import StatsComponent from '../components/core/About/StatsComponent';
import LearningGrid from '../components/core/About/LearningGrid';
import ContactFrom from '../components/core/About/ContactFrom';
import Footer from '../components/core/Footer1';
import ReviewSlider from "../components/common/ReviewSlider";

const About = () => {
    const gradientStyle1 = {
        background: 'linear-gradient(117.95deg, rgba(230, 92, 0, 1), rgba(249, 212, 35, 1))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    };
    const gradientStyle2 = {
        background: 'linear-gradient(117.95deg, rgba(31, 162, 255, 1), rgba(18, 216, 250, 1), rgba(166, 255, 203, 1))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    };
    const gradientStyle = {
        width: '200px',
        height: '200px',
        borderRadius: "40%",
        background: 'linear-gradient(117.95deg, rgba(236, 0, 140, 1), rgba(252, 103, 103, 1))',
        boxShadow: '20px 20px 30px rgba(236, 0, 140, 0.8), -20px -20px 30px rgba(252, 103, 103, 0.8)'
    };
    return (
        <div className=' text-white w-[100vw]'>
            {/* section 1 */}
            <section className='w-[100vw] bg-richblack-800 pb-5 lg:h-[530px]'>
                <div className='w-11/12 relative mx-auto pt-20 px-2 flex flex-col items-center justify-center'>
                    <header className='lg:w-[60%] flex flex-col mx-auto items-center gap-1'>
                        <p className='text-3xl font-semibold '>Driving Innovation in Online Education for a</p>
                        <p className='text-4xl font-semibold'><HighlightText text={" Brighter Future"} /></p>
                        <p className='text-[16px] text-richblack-300 text-center'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </header>
                    <div className='flex sm:relative sm:justify-center md:justify-center lg:relative xl:relative 2xl:absolute top-[110%] gap-3 mx-auto mt-4 flex-wrap'>
                        <img src={BannerImage} alt='banner' className='rounded-[10px]' />
                        <img src={BannerImage2} alt='banner' className='rounded-[10px]' />
                        <img src={BannerImage3} alt='banner' className='rounded-[10px] md:hidden lg:hidden xs:block 2xl:block' />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section>
                <div className='w-11/12 max-w-maxContent sm:mt-5 xs:mt-4 mt-3 lg:mt-[90px] mx-auto'>
                    <Qutoe />
                </div>
            </section>

            {/* Section 3 */}
            <section>
                <div className='flex flex-col w-11/12 max-w-maxContent mx-auto mt-[7rem]'>
                    {/* Founding story top box */}
                    <div className='flex lg:flex-row xs:justify-center flex-col w-[90%] lg:justify-between mb-7'>
                        <div className='lg:w-[44%] pr-2'>
                            <h1 className='text-[36px] font-semibold'><HighlightText text={"Our Founding Story"} /></h1>
                            <p className='text-[16px] text-richblack-300 font-medium'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            <p className='text-[16px] text-richblack-300 font-medium'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>
                        <div className='lg:w-[40%] relative z-10'>
                            <img src={FoundingStory} className='lg:absolute z-10' />
                            <div className='absolute top-2 z-0 left-4 lg:block hidden' style={gradientStyle}></div>
                        </div>
                    </div>
                    {/* Founding story bottom box */}
                    <div className='flex lg:flex-row flex-col w-[90%] justify-between mb-7 gap-3 mt-10'>
                        <div className='lg:w-[44%] pr-2'>
                            <h1 className='text-[36px] font-semibold' style={gradientStyle1}>Our Vision</h1>
                            <p className='text-[16px] text-richblack-300 font-medium'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>
                        <div className='lg:w-[40%]'>
                            <h1 className='text-[36px] font-semibold' style={gradientStyle2}>Our Mission</h1>
                            <p className='text-[16px] text-richblack-300 font-medium'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4 */}
            <StatsComponent />

            {/* Section 5 */}
            <section>
                <LearningGrid />
            </section>

            {/* Section 6 */}
            <section className='w-11/12 flex items-center mb-[100px] mt-[100px]'>
                <ContactFrom />
            </section>

            {/* section 7 */}
            <section className='w-11/12 flex items-center mb-[100px] mt-[100px] mx-auto'>
                <div className='flex flex-col w-full'>
                    <h1 className='text-3xl font-semibold mx-auto'><HighlightText text={"Review from other learners"} /></h1>
                    <ReviewSlider />
                </div>
            </section>

            {/* footer */}
            <Footer />

        </div>


    )
}

export default About;   