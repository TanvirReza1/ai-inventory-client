import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MyModels = () => {
  const { user } = useContext(AuthContext);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/models/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error("Error fetching user's models:", err));
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-10 text-lg">
        Please log in to view your models.
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">
        My Added Models
      </h1>

      {models.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No models added yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <div
              key={model._id}
              className="border rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition"
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{model.name}</h2>
                <p className="text-gray-700">
                  <strong>Framework:</strong> {model.framework}
                </p>
                <p className="text-gray-700">
                  <strong>Use Case:</strong> {model.useCase}
                </p>
                <p className="text-gray-700">
                  <strong>Created By:</strong> {model.createdBy}
                </p>

                <button
                  onClick={() => navigate(`/models/${model._id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyModels;
