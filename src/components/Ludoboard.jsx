import React from "react";

const Ludoboard = () => {
  return (
    <div className="relative w-[300px] h-[300px] border-2 border-gray-100 flex flex-wrap">
      {/* Green House */}
      <div className="absolute w-[40%] h-[40%] p-[7%] bg-green-500">
        <div className="relative w-full h-full bg-white p-[20%] ludoBox">
          <div className="absolute w-[25%] h-[25%] top-[20%] left-[20%] bg-green-500"></div>
          <div className="absolute w-[25%] h-[25%] top-[20%] right-[20%] bg-green-500"></div>
          <div className="absolute w-[25%] h-[25%] bottom-[20%] left-[20%] bg-green-500"></div>
          <div className="absolute w-[25%] h-[25%] bottom-[20%] right-[20%] bg-green-500"></div>
          <i className="fa-solid fa-location-pin z-20"></i>
        </div>
      </div>

      {/* Yellow House */}
      <div className="absolute w-[40%] h-[40%] p-[7%] bg-yellow-300 right-0">
        <div className="relative w-full h-full bg-white p-[20%]">
          <div className="absolute w-[25%] h-[25%] top-[20%] left-[20%] bg-yellow-300"></div>
          <div className="absolute w-[25%] h-[25%] top-[20%] right-[20%] bg-yellow-300"></div>
          <div className="absolute w-[25%] h-[25%] bottom-[20%] left-[20%] bg-yellow-300"></div>
          <div className="absolute w-[25%] h-[25%] bottom-[20%] right-[20%] bg-yellow-300"></div>
        </div>
      </div>

      {/* Red House */}
      <div className="absolute w-[40%] h-[40%] p-[7%] bg-red-600 bottom-0">
        <div className="relative w-full h-full bg-white p-[20%]">
          <div className="absolute w-[25%] h-[25%] top-[20%] left-[20%] bg-red-600"></div>
          <div className="absolute w-[25%] h-[25%] top-[20%] right-[20%] bg-red-600"></div>
          <div className="absolute w-[25%] h-[25%] bottom-[20%] left-[20%] bg-red-600"></div>
          <div className="absolute w-[25%] h-[25%] bottom-[20%] right-[20%] bg-red-600"></div>
        </div>
      </div>

      {/* Blue House */}
      <div className="absolute w-[40%] h-[40%] p-[7%] bg-blue-400 bottom-0 right-0">
        <div className="relative w-full h-full bg-white p-[20%]">
          <div className="absolute w-[25%] h-[25%] top-[20%] left-[20%] bg-blue-400"></div>
          <div className="absolute w-[25%] h-[25%] top-[20%] right-[20%] bg-blue-400"></div>
          <div className="absolute w-[25%] h-[25%] bottom-[20%] left-[20%] bg-blue-400"></div>
          <div className="absolute w-[25%] h-[25%] bottom-[20%] right-[20%] bg-blue-400"></div>
        </div>
      </div>

      {/* Home Triangle */}
      <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] border-b-[16px] border-b-red-600 border-t-[16px] border-t-yellow-300 border-l-[16px] border-l-green-500 border-r-[16px] border-r-blue-400"></div>

      {/* Path Cells */}

      {/* green path */}
      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] left-[6.66%] border border-gray-800 bg-green-500"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] left-[13.32%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] left-[19.98%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] left-[26.64%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] left-[33.3%] border border-gray-800"></div>

      <div className="absolute w-[6.66%] h-[6.66%] top-0 left-[40%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[6.66%] left-[40%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[13.32%] left-[40%] border border-gray-800 bg-gray-100 [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[19.98%] left-[40%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[26.64%] left-[40%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[33.3%] left-[40%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-0 left-[53.32%] border border-gray-800 "></div>

      <div className="absolute w-[6.66%] h-[6.66%] top-0 left-[46.66%] border border-gray-800 text-white text-lg flex items-center justify-center">
        ↓
      </div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[6.66%] left-[46.66%] border border-gray-800 bg-yellow-300"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[13.32%] left-[46.66%] border border-gray-800 bg-yellow-300"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[19.98%] left-[46.66%] border border-gray-800 bg-yellow-300"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[26.64%] left-[46.66%] border border-gray-800 bg-yellow-300"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[33.3%] left-[46.66%] border border-gray-800 bg-yellow-300"></div>

      <div className="absolute w-[6.66%] h-[6.66%] top-[6.66%] left-[53.32%] border border-gray-800 bg-yellow-300 "></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[13.32%] left-[53.32%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[19.98%] left-[53.32%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[26.64%] left-[53.32%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[33.3%] left-[53.32%] border border-gray-800"></div>

      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] right-[33.3%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] right-[26.64%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] right-[19.98%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] right-[13.32%] border border-gray-800 bg-gray-100 [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] right-[6.66%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[40%] right-0 border border-gray-800"></div>

      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] right-[33.3%] border border-gray-800 bg-blue-400"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] right-[26.64%] border border-gray-800 bg-blue-400"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] right-[19.98%] border border-gray-800 bg-blue-400"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] right-[13.32%] border border-gray-800 bg-blue-400"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] right-[6.66%] border border-gray-800 bg-blue-400"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] right-0 border border-gray-800 text-white text-lg flex items-center justify-center">
        ←
      </div>

      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] right-[33.3%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] right-[26.64%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] right-[19.98%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] right-[13.32%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] right-[6.66%] border border-gray-800 bg-blue-400 "></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] right-0 border border-gray-800"></div>

      <div className="absolute w-[6.66%] h-[6.66%] bottom-0 left-[53.32%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[6.66%] left-[53.32%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[13.32%] left-[53.32%] border border-gray-800 bg-gray-100 [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[19.98%] left-[53.32%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[26.64%] left-[53.32%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[33.3%] left-[53.32%] border border-gray-800"></div>

      <div className="absolute w-[6.66%] h-[6.66%] bottom-0 left-[46.66%] border border-gray-800 text-white text-lg flex items-center justify-center">
        ↑
      </div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[6.66%] left-[46.66%] border border-gray-800 bg-red-600"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[13.32%] left-[46.66%] border border-gray-800 bg-red-600"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[19.98%] left-[46.66%] border border-gray-800 bg-red-600"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[26.64%] left-[46.66%] border border-gray-800 bg-red-600"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[33.3%] left-[46.66%] border border-gray-800 bg-red-600"></div>

      <div className="absolute w-[6.66%] h-[6.66%] bottom-0 left-[40%] border border-gray-800"></div>
      {/* <div className=" border border-gray-800"></div> */}
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[6.66%] left-[40%] border border-gray-800 bg-red-600 "></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[13.32%] left-[40%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[19.98%] left-[40%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[26.64%] left-[40%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] bottom-[33.3%] left-[40%] border border-gray-800"></div>

      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] left-[33.3%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] left-[26.64%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] left-[19.98%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] left-[13.32%] border border-gray-800 bg-gray-100 [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] left-[6.66%] border border-gray-800"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[53.32%] left-0 border border-gray-800"></div>

      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] left-[33.3%] border border-gray-800 bg-green-500"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] left-[26.64%] border border-gray-800 bg-green-500"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] left-[19.98%] border border-gray-800 bg-green-500"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] left-[13.32%] border border-gray-800 bg-green-500"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] left-[6.66%] border border-gray-800 bg-green-500"></div>
      <div className="absolute w-[6.66%] h-[6.66%] top-[46.66%] left-0 border border-gray-800 text-white text-lg flex items-center justify-center">
        →
      </div>
    </div>
  );
};

export default Ludoboard;
