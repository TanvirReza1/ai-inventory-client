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
      <section>
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
      <section className=" p-8 rounded-xl">
        <h2 className="text-3xl text-white-700 font-bold mb-4 text-center">
          About AI Models
        </h2>
        <p className="text-white-700 leading-relaxed max-w-3xl mx-auto text-center">
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
    </div>
  );
};

export default Home;
