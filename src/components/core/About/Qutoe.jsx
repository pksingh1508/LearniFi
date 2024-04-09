import React from 'react'

const Qutoe = () => {
    const gradient = {
        gradientType: 'linear',
        colors: [
            'rgba(31, 162, 255, 1)',
            'rgba(18, 216, 250, 1)',
            'rgba(166, 255, 203, 1)'
        ]
    };

    const linearGradient = `linear-gradient(117.95deg, ${gradient.colors.join(', ')})`;

    const gradientStyle = {
        background: linearGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    };
    const gradientStyle2 = {
        background: 'linear-gradient(117.95deg, rgba(255, 81, 47, 1), rgba(240, 152, 25, 1))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    };
    const gradientStyle3 = {
        background: 'linear-gradient(117.95deg, rgba(230, 92, 0, 1), rgba(249, 212, 35, 1))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    };
    return (
        <div className='px-3 text-[30px] lg:text-[36px] font-semibold text-center'>
            <sup className='text-richblack-600 font-extrabold'>"</sup>We are passionate about revolutionizing the way we learn. Our innovative platform
            <span style={gradientStyle}> combine technology</span>,
            <span style={gradientStyle2}> expertise</span>,
            and community to create an
            <span style={gradientStyle3}> unparallel educational experience.</span><sup className='text-richblack-600 font-extrabold'>"</sup>
        </div>
    )
}

export default Qutoe;