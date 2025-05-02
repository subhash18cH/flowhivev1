import { LuClock } from "react-icons/lu";
import { BadgeCheck, Calendar } from 'lucide-react';
import logo from "/src/assets/img.png"

const ProfileCard = ({ name, role, about, vision, spec, avail }) => {
  const roleColors = {
    Developer: "bg-blue-500",
    Marketer: "bg-yellow-400",
  };

  const availability = {
    "Full-Time": <Calendar className="h-4 w-4" />,
    "Part-Time": <LuClock className="h-4 w-4" />
  };

  return (
    <section className="w-full max-w-xs sm:w-80 min-h-[400px] rounded-2xl p-4 sm:p-5 border-yellow-400 border-4 bg-white shadow-md mx-auto">
     
      <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 mb-4">
        <div className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0">
          <img 
            className="h-full w-full object-contain rounded-lg" 
            src={logo}
            alt="logo" 
          />
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="font-semibold text-base sm:text-lg">{name}</h1>
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 py-0.5 rounded-full text-white font-medium text-xs sm:text-sm ${roleColors[role] || "bg-gray-500"}`}>
              {role}
            </span>
            <span className=" text-white bg-green-400 rounded-full">
              <BadgeCheck className="h-6" />
            </span>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {spec.map((item, index) => (
          <span 
            key={index} 
            className="px-2 py-0.5 rounded-full bg-gray-100 text-xs sm:text-sm font-semibold"
          >
            {item}
          </span>
        ))}
      </div>

      {/* About section */}
      <div className="mb-4">
        <p className="font-semibold text-xs sm:text-sm leading-relaxed line-clamp-3">
          {about}
        </p>
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-gray-500 text-xs sm:text-sm">Availability</span>
        <div className="flex items-center space-x-1">
          <span className="text-gray-600">{availability[avail]}</span>
          <span className="text-xs sm:text-sm font-semibold">{avail}</span>
        </div>
      </div>

      {/* Vision section */}
      <div className="flex-1">
        <p className="text-gray-500 text-xs sm:text-sm mb-2">My vision</p>
        <p className="text-xs sm:text-sm leading-relaxed line-clamp-4">
          {vision}
        </p>
      </div>
    </section>
  );
};

export default ProfileCard;