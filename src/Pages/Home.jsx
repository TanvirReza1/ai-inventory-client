import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "../Components/Slide";

const Home = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch("https://ai-model-inventory-server-omega.vercel.app/latest")
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error("Error fetching models:", err));
  }, []);

  return (
    <div className="space-y-16 p-8">
      <Slide></Slide>

      {/* ✅ Dynamic Section */}
      <section className="w-10/12 mx-auto ">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Featured AI Models
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <div
              key={model._id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
              <p className="text-gray-600 font-medium mb-1">
                Framework: {model.framework}
              </p>
              <p className="text-gray-700">
                {model.useCase || "No description available."}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                {model.description || "No description available."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🧩 Static Section 1 */}
      <section className="p-8 rounded-xl">
        <h2
          className="text-3xl text-gray-700 dark:text-gray-300
 font-bold mb-4 text-center"
        >
          About AI Models
        </h2>
        <p
          className="text-gray-700 dark:text-gray-300
 leading-relaxed max-w-3xl mx-auto text-center"
        >
          AI models are computer algorithms trained to recognize patterns and
          make intelligent decisions. They power modern applications like
          chatbots, image recognition, and recommendation systems. These models
          often use neural networks to learn from data, mimicking how humans
          learn.
        </p>
      </section>

      {/* 🚀 Static Section 2 */}
      <section className="text-center p-8 bg-blue-600 text-white rounded-xl max-w-[700px] mx-auto">
        <h2 className="text-3xl font-bold mb-4">Get Started</h2>
        <p className="mb-6">
          Join us today and start managing your AI models easily.
        </p>
        <button
          onClick={() => (window.location.href = "/register")}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Register Now
        </button>
      </section>
      {/* 5️⃣ Features */}
      <section className="py-16 ">
        <h2 className="text-4xl font-bold text-center mb-10">🚀 Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-10/12 mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-xl font-bold">🛒 Model Marketplace</h3>
              <p>Browse, explore, and purchase AI models easily.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-xl font-bold">🔐 Secure Authentication</h3>
              <p>JWT & Firebase based secure login system.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-xl font-bold">🧑‍💼 Role-Based Access</h3>
              <p>Admin, User, and Creator level permissions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ Categories */}
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">🧠 Categories</h2>

        <div className="flex flex-wrap justify-center gap-4">
          <span className="badge badge-primary badge-lg">NLP</span>
          <span className="badge badge-secondary badge-lg">
            Computer Vision
          </span>
          <span className="badge badge-accent badge-lg">Chatbots</span>
          <span className="badge badge-info badge-lg">Analytics</span>
          <span className="badge badge-success badge-lg">Recommendation</span>
        </div>
      </section>

      {/* 7️⃣ How It Works */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          ⚙️ How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-10/12 mx-auto">
          <div className="card bg-base-100 shadow-xl text-center hover:scale-105 transition-transform">
            <div className="card-body">
              <h3 className="text-xl font-bold">1️⃣ Browse Models</h3>
              <p>Explore AI models by category and use case.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl text-center hover:scale-105 transition-transform">
            <div className="card-body">
              <h3 className="text-xl font-bold">2️⃣ Purchase</h3>
              <p>Secure checkout and instant access.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl text-center hover:scale-105 transition-transform">
            <div className="card-body">
              <h3 className="text-xl font-bold">3️⃣ Deploy</h3>
              <p>Use models directly in your applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8️⃣ Statistics */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h2 className="text-4xl font-bold text-center mb-10">📊 Our Impact</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-10/12 mx-auto text-center">
          <div>
            <h3 className="text-5xl font-bold">120+</h3>
            <p className="mt-2">AI Models</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold">5K+</h3>
            <p className="mt-2">Users</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold">2K+</h3>
            <p className="mt-2">Purchases</p>
          </div>
        </div>
      </section>

      {/* 9️⃣ Testimonials */}
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-10">💬 Testimonials</h2>

        <div className="max-w-xl mx-auto">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <p className="italic">
                “This platform helped me deploy AI models faster than ever.”
              </p>
              <h4 className="mt-4 font-bold">— AI Developer</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 🔟 FAQ */}
      <section className="py-16 ">
        <h2 className="text-4xl font-bold text-center mb-10">❓ FAQ</h2>

        <div className="max-w-2xl mx-auto space-y-4">
          <div className="collapse collapse-arrow bg-base-100">
            <input type="checkbox" />
            <div className="collapse-title font-medium">
              Is this platform secure?
            </div>
            <div className="collapse-content">
              <p>Yes, we use Firebase authentication and JWT security.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100">
            <input type="checkbox" />
            <div className="collapse-title font-medium">
              Can I sell my own AI models?
            </div>
            <div className="collapse-content">
              <p>Yes, creators can add and manage their models.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
