"use client";

import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "./button";

const ShareVacancyButton = ({ url, title }) => {
  const share = async ({ title, url }) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.warn("Web Share API is not supported in this browser.");
    }
  };

  const handleShare = () => {
    const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${url}`;
    share({ title, url: fullUrl });
  };

  return (
    <div className="h-5 w-5 shrink-0">
      <Share2 className="h-full w-full" onClick={handleShare} />
    </div>
  );
};

export default ShareVacancyButton;
