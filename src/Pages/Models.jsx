import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Models = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/models") // your backend endpoint
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error("Error loading models:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All AI Models</h1>

      {/* Grid layout for model cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div
            key={model._id}
            className="border rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={model.image}
              alt={model.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{model.name}</h2>
              <p className="text-gray-700">
                <strong>Framework:</strong> {model.framework}
              </p>
              <p className="text-gray-700">
                <strong>Use Case:</strong> {model.useCase}
              </p>

              <Link
                to={`/models/${model._id}`}
                className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Models;
