import React, { useEffect, useState } from 'react'
import MySideBar from './MySideBar'
import { useParams } from 'react-router-dom'
import api from './Api';
import toast from 'react-hot-toast';
import logo from "/src/assets/img.png"
import { Mail } from 'lucide-react';
import { Textarea } from './ui/textarea';
const ClickedProfileInfo = () => {
  const { profile } = useParams();
  console.log("pp", profile)

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
    "brand", "docker", "Java", "Tailwind CSS", "MongoDB",
    "AWS", "Git",
  ];


  const getProfile = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/user/profile/by-id`,
        { params: { profileId: profile } });
      if (response.status === 200) {
        console.log("user profile", response.data)
        setUserData(response.data);
        setInitialData(response.data)
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      <div>
        <MySideBar />
      </div>
      <div className='w-[70%]'>

        <div className=' flex flex-col border-2 border-yellow-400 py-8 px-4 rounded-2xl hover:shadow-md gap-1 mt-16 ml-12  h-[460px]'>

          <div className='flex'>
            <div>
              <img
                className=" rounded-lg h-24"
                src={logo}
                alt="logo"
              />
            </div>

            <div className='flex flex-col gap-1 w-[70%]'>
              <div className='flex gap-2 items-center'>
                <h1 className='font-bold text-3xl text-blue-600'>{userData.fullName} </h1>
                <span><Mail size={17} className='text-gray-500 mt-3 ' /></span>
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
              <div className='flex gap-2'>
                <span>s</span>
                <span>{userData.availability}</span>
              </div>
            </div>

            <div className='mt-3 '>
              <Textarea
                
                className="rounded-xl h-40 resize-none" placeholder=" Add your notes here...
              
              " />

            </div>
          </div>

        </div>


      </div>
    </>
  )
}

export default ClickedProfileInfo