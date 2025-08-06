import React, { useState, useEffect } from "react";

const sliderImages = [
  "/images/Banner12.jpg", // Replace with your actual image paths
  "/images/jw.jpg",
  "/images/coctail.jpg",
  "/images/barckdi.jpg",
];

const PromoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container my-5">
      {/* === Top Slider Section === */}
      <div className="position-relative overflow-hidden rounded shadow">
        <img
          src={sliderImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="img-fluid w-100"
          style={{ maxHeight: "450px", objectFit: "cover" }}
        />
        <button
          className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
          onClick={prevSlide}
        >
          ‹
        </button>
        <button
          className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
          onClick={nextSlide}
        >
          ›
        </button>

        {/* Slider dots */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 pb-2">
          {sliderImages.map((_, idx) => (
            <div
              key={idx}
              className={`rounded-circle ${
                idx === currentIndex ? "bg-dark" : "bg-light"
              }`}
              style={{ width: "10px", height: "10px", cursor: "pointer" }}
              onClick={() => setCurrentIndex(idx)}
            ></div>
          ))}
        </div>
      </div>

      {/* === Bottom Two Images === */}
      <div className="row mt-4 g-3">
        <div className="col-md-6">
          <img
            src="/images/wine.jpg" // Replace with your actual image
            alt="Shop Wine"
            className="img-fluid rounded shadow"
            style={{ width: "100%", height: "180px" }}
          />
        </div>
        <div className="col-md-6">
          <img
            src="/images/hen2.jpg" // Replace with your actual image
            alt="Shop Spirits"
            className="img-fluid rounded shadow"
            style={{ width: "100%", height: "180px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;