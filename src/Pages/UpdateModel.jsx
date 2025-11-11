import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);

  // ✅ Fetch the current model data to pre-fill the form
  useEffect(() => {
    fetch(`http://localhost:3000/models/${id}`)
      .then((res) => res.json())
      .then((data) => setModel(data))
      .catch((err) => console.error("Error fetching model:", err));
  }, [id]);

  // ✅ Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedModel = {
      name: form.name.value,
      framework: form.framework.value,
      useCase: form.useCase.value,
      description: form.description.value,
      price: parseFloat(form.price.value),
      image: form.image.value,
    };

    fetch(`http://localhost:3000/models/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedModel),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully!",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate(`/models/${id}`); // ✅ Redirect after success
        }
      })
      .catch((err) => console.error("Error updating model:", err));
  };

  if (!model) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Model</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={model.name}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Framework</label>
          <input
            type="text"
            name="framework"
            defaultValue={model.framework}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Use Case</label>
          <input
            type="text"
            name="useCase"
            defaultValue={model.useCase}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={model.description}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            defaultValue={model.price}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={model.image}
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Update Model
        </button>
      </form>
    </div>
  );
};

export default UpdateModel;
