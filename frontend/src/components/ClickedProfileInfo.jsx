import React, { useEffect, useState } from 'react'
import MySideBar from './MySideBar'
import { useParams } from 'react-router-dom'
import api from './Api';
import toast from 'react-hot-toast';
import logo from "/src/assets/img.png"
import { Mail } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { LuClock } from "react-icons/lu";
import { Calendar } from 'lucide-react';
const ClickedProfileInfo = () => {


  const availability = {
    "Full-Time": <Calendar className="h-4 w-4" />,
    "Part-Time": <LuClock className="h-4 w-4" />
  };
  const { profile } = useParams();
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "",
    profession: "",
    about: "",
    vision: "",
    skills: [],
    availability: ""
  });

  const availableSkills = [
    'frontend', 'growth', 'seo', 'full-stack', 'backend', 'socila-media',
    'AWS', 'Git', 'ui/ux', 'Docker', 'brand', 'devops',
  ];


  const getProfile = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/user/profile/by-id/${profile}`,
      );
      if (response.status === 200) {
        setUserData(response.data);
        setInitialData(response.data)
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false)
    }
  }
  const handleSendMessage = () => {
  }
  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      <div>
        <MySideBar />
      </div>
      <div className='w-[70%] h-[590px]'>

        <div className=' flex flex-col border-2 border-yellow-400 py-8 px-4 rounded-2xl hover:shadow-md gap-1 mt-16 ml-12  h-[510px]'>

          <div className='flex'>
            <div>
              <img
                className=" rounded-lg h-24"
                src={logo}
                alt="logo"
              />
            </div>

            <div className='flex flex-col gap-1 w-[90%]'>
              <div className='flex gap-2 items-center'>
                <h1 className='font-bold text-3xl text-blue-600'>{userData.fullName} </h1>
                <a ><Mail size={19} className='text-gray-700 mt-2 ' /></a>
              </div>
              <div className='flex justify-start gap-2'>
                <span className='border px-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1'>{userData.profession}</span>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((item, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded-full bg-gray-100 text-xs sm:text-sm font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className=' text-gray-500'>{userData.about}</p>
              </div>
            </div>
          </div>

          <div className='mt-3 ml-4'>
            <div className='flex flex-col'>
              <span className='text-gray-500'>Vision</span>
              <span>{userData.vision}</span>
            </div>

            <div className='mt-3 flex flex-col'>
              <span className='text-gray-500'>Availability</span>
              <div className='flex gap-2 items-center mt-1'>
                <span className="text-gray-600">{availability[userData.availability]}</span>
                <span>{userData.availability}</span>
              </div>
            </div>

            <div className='mt-6 '>
              <Textarea
                className="rounded-xl h-40 resize-none " placeholder=" Write your message here...
              " />
            </div>

            <div className='flex mt-3 justify-end'>
              <button
                onClick={handleSendMessage}
                // disabled={!isDataChanged}
                className={`p-2 border rounded-xl
                   bg-yellow-400 hover:bg-yellow-300
                   cursor-not-allowed
                 `}
              >
                Send message
              </button>
            </div>
          </div>

        </div>


      </div>
    </>
  )
}

export default ClickedProfileInfo