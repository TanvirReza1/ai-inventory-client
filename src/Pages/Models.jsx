import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Models = () => {
  // ================= STATES =================
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);

  const [frameworks, setFrameworks] = useState([]);
  const [useCases, setUseCases] = useState([]);

  const [selectedFramework, setSelectedFramework] = useState("All");
  const [selectedUseCase, setSelectedUseCase] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [loading, setLoading] = useState(true);

  // ================= FETCH MODELS =================
  useEffect(() => {
    fetch("https://ai-model-inventory-server-omega.vercel.app/models")
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setFilteredModels(data);

        setFrameworks(["All", ...new Set(data.map((m) => m.framework))]);
        setUseCases(["All", ...new Set(data.map((m) => m.useCase))]);
      })
      .catch((err) => console.error("Error loading models:", err))
      .finally(() => setLoading(false));
  }, []);

  // ================= APPLY FILTERS =================
  const applyFilters = (search, framework, useCase) => {
    let url = `https://ai-model-inventory-server-omega.vercel.app/models?`;

    if (search) url += `search=${search}&`;
    if (framework !== "All") url += `framework=${framework}&`;
    if (useCase !== "All") url += `useCase=${useCase}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFilteredModels(data);
        setCurrentPage(1);
      })
      .catch((err) => console.error("Filtering error:", err));
  };

  // ================= HANDLERS =================
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(value, selectedFramework, selectedUseCase);
  };

  const handleFrameworkChange = (e) => {
    const value = e.target.value;
    setSelectedFramework(value);
    applyFilters(searchTerm, value, selectedUseCase);
  };

  const handleUseCaseChange = (e) => {
    const value = e.target.value;
    setSelectedUseCase(value);
    applyFilters(searchTerm, selectedFramework, value);
  };

  // ================= SORTING =================
  const sortedModels = [...filteredModels].sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "date")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  // ================= PAGINATION =================
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedModels = sortedModels.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="lg:w-10/12 mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Explore AI Models</h1>

      {/* SEARCH, FILTERS, SORT */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by model name..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-xs"
        />

        {/* Framework Filter */}
        <select
          value={selectedFramework}
          onChange={handleFrameworkChange}
          className="select select-bordered w-full max-w-xs"
        >
          {frameworks.map((fw) => (
            <option key={fw} value={fw}>
              {fw}
            </option>
          ))}
        </select>

        {/* Use Case Filter */}
        <select
          value={selectedUseCase}
          onChange={handleUseCaseChange}
          className="select select-bordered w-full max-w-xs"
        >
          {useCases.map((uc) => (
            <option key={uc} value={uc}>
              {uc}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Sort By</option>
          <option value="name">Name (A → Z)</option>
          <option value="date">Newest First</option>
        </select>
      </div>

      {/* MODELS GRID */}
      {paginatedModels.length > 0 ? (
        <div className="grid text-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedModels.map((model) => (
            <div
              key={model._id}
              className="border rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
            >
              <img
                src={model.image}
                alt={model.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-xl font-semibold">{model.name}</h2>

                <p className="text-sm text-gray-600 my-2">
                  {model.description?.slice(0, 80)}...
                </p>

                <p>
                  <strong>Framework:</strong> {model.framework}
                </p>
                <p>
                  <strong>Use Case:</strong> {model.useCase}
                </p>

                <Link
                  to={`/models/${model._id}`}
                  className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          className="btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        <button
          className="btn"
          disabled={startIndex + itemsPerPage >= sortedModels.length}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Models;
