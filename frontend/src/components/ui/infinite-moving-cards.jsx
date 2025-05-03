"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "../ProfileCard";
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);
  
  useEffect(() => {
    addAnimation();
  }, []);
  
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      
      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };
  
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] z-10 ",
        className
      )}
      style={{
        "--animation-duration": "40s",
        "--animation-direction": "forwards",
      }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 z-10",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: "var(--animation-duration)",
          animationDirection: "var(--animation-direction)",
          animationIterationCount: "infinite",
          animationName: "scroll",
          animationTimingFunction: "linear",
        }}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[320px] max-w-full shrink-0 px-2"
            key={idx}
          >
            <ProfileCard
              userId={item.userId}
              name={item.fullName}
              role={item.profession}
              about={item.about}
              vision={item.vision}
              spec={item.skills}
              avail={item.availability}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
