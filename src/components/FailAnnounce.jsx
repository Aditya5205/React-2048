import React from "react";

const FailAnnounce = ({ isFail }) => {
  if (isFail) {
    return (
      <div className="h-fit rounded-t-xl bg-red-500 p-2 text-2xl font-bold text-white">
        Failed! Try Again
      </div>
    );
  }
};

export default FailAnnounce;
