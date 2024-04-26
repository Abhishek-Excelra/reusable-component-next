import React, { useState } from "react";
import AccordionItem from "./Accordian";
import axios from "axios";
import downloadJSON from "../../utils/downloadJSON";
const Preview = ({ showPreview, setShowPreview, variable, rowData }) => {
  const [response, setResponse] = useState({});
  const { request_status } = rowData
  React.useEffect(() => {
    (async () => {
      const response = await (axios.post("http://13.200.179.225:8002/view", { ...variable }));

      setResponse(response);
    })();
  }, [variable]);

  const closeModal = () => {
    setShowPreview(false);
  };
  const jsonData = response.data;
  const { dataset_id } = variable
  const button = [
    {
      label: 'Download', func: () => downloadJSON(jsonData, dataset_id), display: false
    },
    { label: 'Close', func: closeModal, display: true }
  ]
  const jsonDataHeader = jsonData && Object.entries(jsonData).map(([key]) => (key))
  return (
    showPreview && jsonDataHeader && (
      <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30">
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              View Dataset - {dataset_id}
            </h3>
            <br />
            {jsonDataHeader.map(dataHeader =>
              <AccordionItem
                title={dataHeader}
                content={jsonData[dataHeader]} />
            )}
            {
              button.map(({ label, func, display }) =>
              ((!(request_status === 'pending') || display) && <button
                className="mt-4 py-2 ml-2 px-4 bg-blue-500 text-white rounded-md shadow-md focus:outline-none transition duration-300 hover:bg-blue-600"
                onClick={func}
              >
                {label}
              </button>)
              )
            }
          </div>
        </div>
      </div>
    )
  );
};

export default Preview;
