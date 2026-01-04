import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Slide = () => {
  const banners = [
    {
      id: 1,
      image: "/images/banner1.jpg",
      title: "Explore Powerful AI Models",
      desc: "Discover, compare, and purchase AI models built for your business.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      title: "Boost Your Productivity",
      desc: "Use pre-trained models to save time and resources.",
    },
    {
      id: 3,
      image: "/images/banner3.jpg",
      title: "Manage Models Seamlessly",
      desc: "Track, update, and organize models in one platform.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {banners.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={item.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {item.title}
            </h2>
            <p className="max-w-2xl mb-6">{item.desc}</p>

            {/* CTA */}
            <Link to="/models" className="btn btn-primary btn-lg">
              Explore Models
            </Link>
          </div>
        </div>
      ))}

      {/* Manual Controls */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
        }
        className="absolute left-4 top-1/2 text-white text-2xl"
      >
        ❮
      </button>

      <button
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 text-white text-2xl"
      >
        ❯
      </button>

      {/* Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white">
        <FaChevronDown size={24} />
      </div>
    </section>
  );
};

export default Slide;
