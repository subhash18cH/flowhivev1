import React, { useEffect, useState } from 'react';
import MySideBar from './MySideBar';
import { Textarea } from './ui/textarea';
import api from './Api';
import toast from 'react-hot-toast';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [userData, setUserData] = useState({
    fullName: '',
    profession: '',
    about: '',
    vision: '',
    skills: [],
    availability: ''
  });

  const availableSkills = [
    'frontend', 'growth', 'seo', 'full-stack', 'backend', 'socila-media',
    'AWS', 'Git', 'ui/ux', 'Docker', 'brand', 'devops'
  ];

  const toggleSkill = (skill) => {
    setUserData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get("/user/profile");
      if (response.status === 200) {
        setUserData(response.data);
        setInitialData(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChanges = async () => {
    try {
      const response = await api.put("/user/profile", userData);
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setUserData(response.data);
        setInitialData(response.data);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const isDataChanged = JSON.stringify(userData) !== JSON.stringify(initialData);

  return (
    <div className="flex flex-col lg:flex-row ">
      <MySideBar />

      <div className="flex-1 px-4 sm:px-6 md:px-10 py-6 mt-16">
        <div className="max-w-4xl mx-auto border rounded-xl p-6 sm:p-8 shadow-md bg-white">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Edit Your Profile</h1>

          {/* Name Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              value={userData.fullName}
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Profession */}
          <div className="mb-6">
            <h2 className="mb-2 font-medium">Type</h2>
            <div className="flex gap-4 flex-wrap">
              {['Developer', 'Marketer'].map((type) => (
                <button
                  key={type}
                  onClick={() => setUserData({ ...userData, profession: type })}
                  className={`px-4 py-2 border rounded-2xl ${userData.profession === type ? 'bg-yellow-400' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Description</label>
            <Textarea
              value={userData.about}
              onChange={(e) => setUserData({ ...userData, about: e.target.value })}
              className="rounded-xl h-20 w-full"
              placeholder="E.g. I'm a [role] with [X] years of experience..."
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h2 className="mb-4 font-medium">Tags</h2>
            <div className="flex flex-wrap gap-3">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 border rounded-2xl ${userData.skills.includes(skill)
                    ? 'bg-yellow-400'
                    : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h2 className="mb-2 font-medium">Availability</h2>
            <div className="flex gap-4 flex-wrap">
              {['Part-Time', 'Full-Time'].map((time) => (
                <button
                  key={time}
                  onClick={() => setUserData({ ...userData, availability: time })}
                  className={`px-4 py-2 border rounded-2xl ${userData.availability === time ? 'bg-yellow-400' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="mb-6">
            <h2 className="mb-2 font-medium">Your Vision</h2>
            <Textarea
              value={userData.vision}
              onChange={(e) => setUserData({ ...userData, vision: e.target.value })}
              className="rounded-xl h-20 w-full"
              placeholder="Goals: What specific impact do you want to make?"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleChanges}
              disabled={!isDataChanged}
              className={`px-6 py-2 rounded-xl font-semibold text-white ${isDataChanged
                ? 'bg-yellow-500 hover:bg-yellow-400'
                : 'bg-yellow-300 cursor-not-allowed'
                }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
