import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Models = () => {
  // ✅ States for filtering and searching
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search term state
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all models
  useEffect(() => {
    fetch("http://localhost:3000/models")
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setFilteredModels(data);
        const uniqueFrameworks = [
          "All",
          ...new Set(data.map((m) => m.framework)),
        ];
        setFrameworks(uniqueFrameworks);
      })
      .catch((err) => console.error("Error loading models:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Filter by framework
  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setSelectedFramework(selected);
    applyFilters(searchTerm, selected);
  };

  // ✅ Search functionality (fetch from backend using regex)
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(value, selectedFramework);
  };

  // ✅ Combined filtering logic (both search + framework)
  const applyFilters = (search, framework) => {
    let url = `http://localhost:3000/models?`;
    if (search) url += `search=${search}&`;
    if (framework && framework !== "All") url += `framework=${framework}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setFilteredModels(data))
      .catch((err) => console.error("Error filtering models:", err));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="lg:w-10/12 mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All AI Models</h1>

      {/* ✅ Search and Filter controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center  gap-4 mb-6">
        {/* ✅ Search Bar */}
        <input
          type="text"
          placeholder="Search by model name..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-xs"
        />

        {/* ✅ Framework Filter */}
        <div className="flex items-center gap-3">
          <label className="font-medium">Framework:</label>
          <select
            value={selectedFramework}
            onChange={handleFilterChange}
            className="select select-bordered w-full max-w-xs"
          >
            {frameworks.map((fw) => (
              <option key={fw} value={fw}>
                {fw}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ✅ Display Filtered Models */}
      {filteredModels.length > 0 ? (
        <div className="grid text-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
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
      ) : (
        <p className="text-center text-gray-600">No models found.</p>
      )}
    </div>
  );
};

export default Models;
