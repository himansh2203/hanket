import React from "react";
import adsImg from "../assets/ads.jpg";
import "../style/AdsBlock.css";

const AdsBlock = () => {
  return (
    <div className="ads-container">
      <img src={adsImg}></img>
    </div>
  );
};

export default AdsBlock;
