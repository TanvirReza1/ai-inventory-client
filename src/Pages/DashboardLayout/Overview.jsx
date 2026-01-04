import { FaCubes, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";

const Overview = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <FaCubes className="text-3xl text-primary" />
            <h3 className="text-lg font-semibold">My Models</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <FaShoppingCart className="text-3xl text-primary" />
            <h3 className="text-lg font-semibold">My Purchases</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <FaMoneyBillWave className="text-3xl text-primary" />
            <h3 className="text-lg font-semibold">Total Spent</h3>
            <p className="text-2xl font-bold">$120</p>
          </div>
        </div>
      </div>

      {/* Placeholder Chart */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="text-lg font-semibold">Activity Overview</h3>
          <p className="text-gray-500">
            Chart will be displayed here (models & purchases).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
