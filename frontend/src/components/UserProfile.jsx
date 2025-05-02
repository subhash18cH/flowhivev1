import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea"

const UserProfile = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [step, setStep] = useState(1);
  const nextStep = () => {
    if (step < 6) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  return (
    <>

      <div className='h-[450px]'>
        <div className='flex items-center justify-center mt-10 border-b'>
          <h2 className='text-3xl font-bold mb-4'>Your Profile</h2>
        </div>

        <div className='flex justify-center mt-10'>
          <button className=' py-2 px-3 font-semibold  bg-yellow-400 rounded-full flex gap-3 items-center'>
            <FaRegEye />
            <span>Preview Profile</span>
          </button>
        </div>

        {step == 1 && <div className='flex flex-col justify-center items-center mt-10'>
          <h1 className='text-2xl font-bold'>What's Your Name?*</h1>
          <input type="text" className='border py-3 h-16 px-4 w-[50%] mt-7 rounded-full border-yellow-500 outline-yellow-500 border-1' placeholder='aman rawat' />
        </div>}

        {step == 2 && <div className='flex flex-col justify-center items-center mt-10'>
          <h1 className='text-2xl font-bold'>What is your role?*</h1>
          <span className=' text-gray-500'>Are you a marketer or a developer?</span>
          <div className='flex gap-6 mt-14 '>
            <button onClick={() => setSelectedRole("Developer")} className={` py-2 border px-4 rounded-2xl ${selectedRole === "Developer"
              ? "bg-yellow-400 "
              : ""
              }`}>Developer</button>
            <button onClick={() => setSelectedRole("Marketer")} className={` py-2  border px-4 rounded-2xl ${selectedRole === "Marketer"
              ? "bg-yellow-400 "
              : ""
              }`}>Marketer</button>
          </div>
        </div>}

        {step == 3 && <div className='flex flex-col justify-center items-center mt-10'>
          <h1 className='text-2xl font-bold'>About You*</h1>
          <span className=' text-gray-500'>Give us a short intro about yourself</span>
          <div className='flex gap-6 mt-9 '>
            <Textarea className="w-[600px] h-16" placeholder="E.g. I'm a [role] with [X] years of experience in [main skills]. I specialize in [area] and have a track record of [achievement]. " />
          </div>
        </div>}

        {step == 4 && <div className='flex flex-col justify-center items-center mt-10'>
          <h1 className='text-2xl font-bold'>Your Skills*</h1>
          <span className=' text-gray-500'>What are your areas of expertise?</span>
          <div className='flex gap-6 mt-9 '>
            <Textarea className="w-[600px] h-16" placeholder="E.g. I'm a [role] with [X] years of experience in [main skills]. I specialize in [area] and have a track record of [achievement]. " />
          </div>
        </div>}

      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className={`flex px-5 py-3 items-center hover:bg-gray-100 ml-16 gap-2 border rounded-full  ${step === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={step === 1}
        >
          <MdKeyboardArrowLeft />
          Previous
        </button>

        <button
          onClick={nextStep}
          className={` flex  items-center mr-16 gap-2 bg-yellow-400 px-6 py-3 rounded-full ${step === 6 ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300"}`}
          disabled={step === 6}
        >
          <span className='text-sm'>Next</span>
          <MdKeyboardArrowRight />
        </button>
      </div>
    </>
  )
}

export default UserProfile