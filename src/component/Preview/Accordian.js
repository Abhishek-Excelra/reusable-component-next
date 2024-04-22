import { useState } from "react";
import Table from "./Table";

const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="border-b border-gray-200">
        <button
          className={`w-full py-3 text-left focus:outline-none transition duration-300 hover:bg-gray-100 ${
            isOpen ? "bg-gray-200" : ""
          }`}
          onClick={toggleAccordion}
        >
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-800">{title}</p>
            <svg
              className={`w-5 h-5 transition-transform ${
                isOpen ? "transform rotate-90" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3.293L3.707 9.586a1 1 0 001.414 1.414L10 5.414l5.879 5.879a1 1 0 001.414-1.414L10 3.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
        {isOpen && (
          <div className="p-4">
            <Table data={content} />
          </div>
        )}
      </div>
    );
  };
export default AccordionItem;