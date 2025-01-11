import React from "react";

const AlertMessage = ({ type, message }) => {
  if (!message) return null;

  const alertStyles = {
    success: "text-green-500 bg-green-100",
    error: "text-red-500 bg-red-100",
    info: "text-blue-500 bg-blue-100",
    warning: "text-yellow-500 bg-yellow-100",
  };

  return (
    <div className={`mt-4 p-2 rounded shadow ${alertStyles[type]}`}>
      {message}
    </div>
  );
};

export default AlertMessage;
