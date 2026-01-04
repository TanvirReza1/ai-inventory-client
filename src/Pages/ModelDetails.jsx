import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const ModelDetails = () => {
  const model = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // optional chaining to avoid crash
  const [purchaseCount, setPurchaseCount] = useState(model?.purchaseCount || 0);

  if (!model) {
    return <p className="text-center mt-10">Loading model details...</p>;
  }

  const {
    _id,
    name,
    framework,
    useCase,
    dataset,
    description,
    image,
    createdBy,
  } = model;

  const handlePurchase = async () => {
    const purchaseData = {
      modelId: _id,
      name,
      framework,
      image,
      createdBy,
      useCase,
      buyerEmail: user.email,
      date: new Date(),
    };

    const res = await fetch(
      "https://ai-model-inventory-server-omega.vercel.app/purchase",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(purchaseData),
      }
    );

    if (res.ok) {
      setPurchaseCount((prev) => prev + 1);
      Swal.fire("Success!", "Model purchased successfully!", "success");
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This model will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `https://ai-model-inventory-server-omega.vercel.app/models/${_id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        Swal.fire("Deleted!", "Model has been removed.", "success");
        navigate("/models");
      } else {
        Swal.fire("Error", data.message || "Failed to delete model.", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 shadow-lg rounded-xl mt-10">
      <img
        src={image}
        alt={name}
        className="w-full h-72 object-cover rounded-xl mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">{name}</h1>
      <p className="text-lg mb-4 text-gray-600">{description}</p>

      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <p>
          <strong>Framework:</strong> {framework}
        </p>
        <p>
          <strong>Use Case:</strong> {useCase}
        </p>
        <p>
          <strong>Dataset:</strong> {dataset}
        </p>
        <p>
          <strong>Purchased:</strong> {purchaseCount} times
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        {/* Purchase */}
        <button onClick={handlePurchase} className="btn btn-success">
          Purchase Model
        </button>

        {/* Show edit/delete if creator */}
        {user?.email === createdBy && (
          <>
            <button
              onClick={() => navigate(`/update-model/${_id}`)}
              className="btn btn-warning"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModelDetails;
