import React from "react";

const cards = [
  {
    title: "CURRENT SPECIALS",
    subtitle: "Shop Now",
  
    image: "/images/bottom1.jpg",
  },
  {
    title: "NEW ARRIVALS",
    subtitle: "Discover Now",
  
    image: "/images/bottom2.jpg",
  },
  {
    title: "WEDDINGS EVENTS",
    subtitle: "Save the Date",

    image: "/images/bottom3.jpg",
  },
];

const EventsSection = () => {
  return (
    <div className="container my-5">
      <div className="row g-3">
        {cards.map((card, index) => (
          <div className="col-12 col-md-4" key={index}>
            <div
              className="position-relative overflow-hidden rounded shadow-sm"
              style={{
                height: "150px",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="img-fluid w-100 h-100"
                style={{
                  objectFit: "cover",
                  filter: "brightness(60%)",
                }}
              />

              {/* Overlay Content */}
              <div className="position-absolute top-50 start-50 translate-middle text-center px-3">
                {card.icon && (
                  <img
                    src={card.icon}
                    alt="icon"
                    style={{
                      width: "28px",
                      height: "28px",
                      marginBottom: "0.5rem",
                      filter: "invert(1)", // ensure white even if SVG is dark
                    }}
                  />
                )}
                <h5
                  className="fw-bold mb-1 text-uppercase"
                  style={{ color: "#fff" }}
                >
                  {card.title}
                </h5>
                <p className="mb-0 fs-6" style={{ color: "#fff" }}>
                  {card.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;