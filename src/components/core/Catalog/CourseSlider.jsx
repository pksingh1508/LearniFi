import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/pagination"
import Course_Card from './Course_Card';

const CourseSlider = ({ Courses }) => {
    return (
        <>
            {
                Courses?.length ?
                    (
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={200}
                            pagination={true}
                            modules={[Pagination, Autoplay]}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            className='mySwiper'
                        >
                            {
                                Courses?.map((course, index) => (
                                    <SwiperSlide key={index}>
                                        <Course_Card course={course} Height={"h-[250px]"} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    )
                    : (
                        <p> No Courses Found</p>
                    )
            }
        </>
    )
}

export default CourseSlider;