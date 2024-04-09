import React from 'react'

const stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" }
]

const StatsComponent = () => {
    return (
        <section className='w-[100vw] bg-richblack-700 my-3'>
            <div>
                <div className='flex lg:flex-row md:flex-row flex-col gap-6 w-11/12 mx-auto justify-around'>
                    {
                        stats.map((data, index) => {
                            return (
                                <div key={index} className='flex flex-col items-center px-5 py-1 my-6'>
                                    <h1 className='text-[30px] text-richblack-5 font-bold'>{data.count}</h1>
                                    <h2 className='text-richblack-500 font-semibold'>{data.label}</h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent;