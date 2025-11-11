import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";

const MyModelPurchases = () => {
  const { user } = useContext(AuthContext);
  const [purchasedModels, setPurchasedModels] = useState([]);
  const [loading, setLoading] = useState(true); // <-- loading state

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/purchases/${user.email}`)
        .then((res) => res.json())
        .then((data) => setPurchasedModels(data))
        .catch((err) => console.error("Error fetching purchased models:", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        My Purchased Models
      </h1>

      {purchasedModels.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t purchased any models yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {purchasedModels.map((model) => (
            <div
              key={model._id}
              className="border rounded-2xl shadow-lg overflow-hidden bg-white"
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{model.name}</h2>
                <p className="text-gray-700 mt-1">
                  <span className="font-semibold">Framework:</span>{" "}
                  {model.framework}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Use Case:</span>{" "}
                  {model.useCase}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Created by:</span>{" "}
                  {model.createdBy}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">
                    Purchased by:{user.email}{" "}
                  </span>{" "}
                  {model.purchasedBy}
                </p>

                <Link to={`/models/${model._id}`}>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyModelPurchases;
