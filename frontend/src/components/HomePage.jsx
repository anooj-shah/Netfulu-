
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="w-full h-full absolute top-0 left-0">
      <div className="w-screen h-screen absolute top-0 left-0">
        <div className="h-full w-full absolute top-0 left-0 flex flex-row items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <button class="bg-blue-700 text-white font-bold py-2 px-4 mt-4 text-5xl focus:outline-none rounded rounded-lg">
                Create Party
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}