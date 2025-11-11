import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const AddModel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddModel = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const framework = form.framework.value;
    const useCase = form.useCase.value;
    const dataset = form.dataset.value;
    const description = form.description.value;
    const image = form.image.value;
    const createdBy = user?.email;

    const newModel = {
      name,
      framework,
      useCase,
      dataset,
      description,
      image,
      createdBy,
    };

    fetch("http://localhost:3000/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newModel),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Model Added!",
            text: "Your model has been added successfully.",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/models");
        }
      })
      .catch((err) => console.error("Error adding model:", err));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10  p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Add New AI Model
      </h2>
      <form onSubmit={handleAddModel} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Model Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="framework"
          placeholder="Framework (e.g., TensorFlow)"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="useCase"
          placeholder="Use Case (e.g., NLP, Vision)"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="dataset"
          placeholder="Dataset"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        ></textarea>
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Add Model
        </button>
      </form>
    </div>
  );
};

export default AddModel;
