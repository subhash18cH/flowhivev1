import React, { useEffect, useState } from "react";
import MySideBar from "./MySideBar";
import { motion, useAnimation } from "framer-motion";
import ProfileCard from "./ProfileCard";
import api from "./Api";
import toast from "react-hot-toast";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const Partner = () => {
  const [clickedCategory, setClickedCategory] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [marketers, setMarketers] = useState([]);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const getAllDevelopers = async () => {
    try {
      const response = await api.get("/user/profile/developers");
      if (response.status === 200) {
        setDevelopers(response.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getAllMarketers = async () => {
    try {
      const response = await api.get("/user/profile/marketers");
      if (response.status === 200) {
        setMarketers(response.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClick = (category) => {
    if (clickedCategory !== category) {
      setClickedCategory(category);
    }
  };

  useEffect(() => {
    if (clickedCategory === "Developer") {
      getAllDevelopers();
    } else if (clickedCategory === "Marketer") {
      getAllMarketers();
    }
  }, [clickedCategory]);


  useEffect(() => {
    if (!isDragging) {
      controls.start({
        x: ["0%", "-100%"],
        transition: { ease: "linear", duration: 10, repeat: Infinity },
      });
    }
  }, [isDragging, controls]);

  return (
    <>
      <div>
        <MySideBar />
      </div>
      <div className="w-full pb-2">
        <div className="flex flex-col items-center mt-10">
          <div className="mb-16 flex flex-col gap-2">
            <h1 className="text-4xl font-bold">FlowHive Matcher</h1>
            <span className="text-gray-600">
              Swipe and &#x2764; your perfect business partner
            </span>
          </div>

          {!clickedCategory && (
            <div>
              <h1 className="text-2xl font-bold text-center">
                Who are you looking for?
              </h1>
              <span className="text-gray-500">
                Choose the type of partner you want to collaborate with
              </span>
            </div>
          )}

          {!clickedCategory && (
            <div className="flex gap-5 mt-10">
              <button
                onClick={() => handleClick("Developer")}
                className="border rounded-xl bg-yellow-400 hover:bg-yellow-300 py-3 px-8"
              >
                Developers
              </button>

              <button
                onClick={() => handleClick("Marketer")}
                className="border rounded-xl bg-yellow-400 hover:bg-yellow-300 py-3 px-8"
              >
                Marketers
              </button>
            </div>
          )}

          {clickedCategory === "Developer" && (
            <div className="w-full">
              <InfiniteMovingCards
                items={[...developers, ...developers]}
                direction="left"
                speed="fast"
              />
            </div>
          )}

          {clickedCategory === "Marketer" && (
            <div className="w-full">
              <InfiniteMovingCards
                items={[...marketers, ...marketers]}
                direction="left"
                speed="fast"
              />
            </div>
          )}




        </div>
      </div>
    </>
  );
};

export default Partner;