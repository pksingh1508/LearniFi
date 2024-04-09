import React from 'react'
import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
import { useState } from 'react';
import { useEffect } from 'react';
import GetAvgRating from '../../../utils/avgRating';

const Course_Card = ({ course, Height }) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])

    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div>
                    <img src={course?.thumbnail} alt='Course_Thumbnail' className={`${Height} w-full rounded-xl object-cover`} />
                </div>
                <div>
                    <p>{course?.courseName}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div>
                        <span>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span>{course?.ratingAndReviews?.length} Rating</span>
                    </div>
                    <p>{course?.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card;