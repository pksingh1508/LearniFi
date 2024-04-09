import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const RequirementField = ({ name, label, register, errors, setValue, getValue }) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(() => {
        if (editCourse) {
            setRequirementList(course?.instructions)
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList]);

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }
    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

    return (
        <div>

            <label htmlFor={name} className='text-white'>{label}<sup className=' text-pink-600'>*</sup></label>
            <div>
                <input
                    type='text'
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
            </div>
            <button
                type='button'
                onClick={handleAddRequirement}
                className='font-semibold mt-2 text-yellow-50'
            >
                Add
            </button>

            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList?.map((requirement, index) => (
                                <li key={index} className="flex items-center text-richblack-5">
                                    <span>{requirement}</span>
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveRequirement(index)}
                                        className="ml-2 text-xs text-pure-greys-300 "
                                    >
                                        Clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {label} is required
                    </span>
                )
            }

        </div>
    )
}

export default RequirementField;