import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-200 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! This AI model doesn’t exist.</p>
      <Link to="/">
        <button className="btn btn-primary">Return Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
