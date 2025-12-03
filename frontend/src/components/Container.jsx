import React from "react";
import Card from "./Card";

const Container = () => {
  return (
    <div>
      <div className="w-full bg-amber-300 font-bold text-gray-700 text-2xl flex justify-center py-4">
        Products Cambodai
      </div>
      <div className="bg-gray-100">
        <Card />
      </div>
    </div>
  );
};

export default Container;
