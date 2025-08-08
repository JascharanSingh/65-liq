import React, { useState, useEffect } from "react";

const sliderImages = [
  "/images/Banner12.jpg",
  "/images/jw.jpg",
  "/images/coctail.jpg",
  "/images/barckdi.jpg",
];

const cardImageStyle = {
  width: "100%",
  height: "250px",             // Expanded height
  objectFit: "cover",
  transition: "transform 0.4s cubic-bezier(.21,1.02,.73,1), box-shadow 0.28s",
  boxShadow: "0 6px 32px rgba(100,40,0,.13)",
  cursor: "pointer"
};

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

  // Hover animation logic for cards
  const handleImgHover = (e) => {
    e.currentTarget.style.transform = "scale(1.06) rotate(-1.5deg)";
    e.currentTarget.style.boxShadow = "0 16px 48px 0 rgba(222,170,71,0.14)";
  };
  const handleImgUnhover = (e) => {
    e.currentTarget.style.transform = "scale(1) rotate(0)";
    e.currentTarget.style.boxShadow = "0 6px 32px rgba(100,40,0,.13)";
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
            src="/images/wine.jpg"
            alt="Shop Wine"
            className="img-fluid rounded shadow"
            style={cardImageStyle}
            onMouseEnter={handleImgHover}
            onMouseLeave={handleImgUnhover}
          />
        </div>
        <div className="col-md-6">
          <img
            src="/images/hen2.jpg"
            alt="Shop Spirits"
            className="img-fluid rounded shadow"
            style={cardImageStyle}
            onMouseEnter={handleImgHover}
            onMouseLeave={handleImgUnhover}
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;