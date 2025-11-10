import React, { useEffect, useState } from "react";

const Slide = () => {
  // 👇 Use static data here
  const banners = [
    {
      id: 1,
      image:
        "/images/banner1.jpg", 
      title: "Explore Powerful AI Models",
      desc: "Discover, compare, and purchase AI models built for your business.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", // online image
      title: "Boost Your Productivity",
      desc: "Use pre-trained models to save time and resources on your next project.",
    },
    {
      id: 3,
      image: "/images/banner3.jpg",
      title: "Manage Models Seamlessly",
      desc: "Track, update, and organize your models in one platform.",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-2xl shadow-lg">
      {banners.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-md">
              {item.title}
            </h2>
            <p className="text-lg md:text-xl max-w-2xl">{item.desc}</p>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-3 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-3 rounded-full"
      >
        ❯
      </button>
    </div>
  );
};

export default Slide;
