import React from "react";

const Table = ({ data }) => {
  const renderRow = (key, value) => {
    if (typeof value === "object" && value !== null) {
      return (
        <React.Fragment key={key}>
          <tr>
            <td colSpan="2" className="border px-4 py-2 font-bold">
              {key}
            </td>
          </tr>
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <React.Fragment key={nestedKey}>
              {renderRow(`${nestedKey}`, nestedValue)}
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    } else {
      return (
        <tr>
          <td className="border px-4 py-2">{key}</td>
          <td className="border px-4 py-2">{value}</td>
        </tr>
      );
    }
  };

  return (
    <table className="table-auto w-full" >
      <thead>
        <tr className="bg-gray-300 text-blue-600">
          <th className="border px-4 py-2">Attribute</th>
          <th className="border px-4 py-2">Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <React.Fragment key={key}>{renderRow(key, value)}</React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
