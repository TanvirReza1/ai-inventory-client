const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About AI Model Inventory</h1>

      <p className="text-base-content mb-4">
        AI Model Inventory is a platform designed to help developers discover,
        publish, and manage AI models easily and securely.
      </p>

      <p className="text-base-content mb-4">
        Our mission is to simplify access to AI solutions while maintaining
        transparency, security, and ease of use.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="card bg-base-100 shadow p-6">
          <h3 className="font-semibold text-lg mb-2">Discover</h3>
          <p>Browse high-quality AI models with detailed information.</p>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h3 className="font-semibold text-lg mb-2">Publish</h3>
          <p>Upload and manage your own AI models securely.</p>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h3 className="font-semibold text-lg mb-2">Purchase</h3>
          <p>Buy models safely using secure payment integration.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
