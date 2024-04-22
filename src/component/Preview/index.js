import React, { useState } from "react";
import JSONResponse from "./response_json.json";
import AccordionItem from "./Accordian";

const Preview = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  // API call and Render data dynamically
  const jsonData = JSONResponse;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md focus:outline-none transition duration-300 hover:bg-blue-600"
        onClick={openModal}
      >
        View
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30">
          <div className="min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                View Dataset
              </h3>
              <br />
              <AccordionItem title="Project" content={jsonData.project} />
              <AccordionItem
                title="Investigation"
                content={jsonData.investigation}
              />
              <AccordionItem title="Study" content={jsonData.study} />
              <AccordionItem title="Experiment" content={jsonData.experiment} />
              <button
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-md focus:outline-none transition duration-300 hover:bg-blue-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
