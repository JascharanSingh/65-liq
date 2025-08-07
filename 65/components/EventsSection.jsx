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
      <style>{`
        .event-card {
          height: 180px;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .event-card:hover .event-image {
          transform: scale(1.08);
        }

        .event-image {
          transition: transform 0.3s ease, filter 0.3s ease;
          filter: brightness(60%);
          object-fit: cover;
        }

        .event-text h5 {
          font-size: 1.1rem;
          letter-spacing: 1px;
        }

        .event-text p {
          font-size: 0.95rem;
          opacity: 0.85;
        }
      `}</style>

      <div className="row g-3">
        {cards.map((card, index) => (
          <div className="col-12 col-md-4" key={index}>
            <div className="event-card position-relative shadow-sm">
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="img-fluid w-100 h-100 position-absolute top-0 start-0 event-image"
              />

              {/* Overlay Content */}
              <div className="position-absolute top-50 start-50 translate-middle text-center px-3 event-text text-white">
                <h5 className="fw-bold text-uppercase mb-1">{card.title}</h5>
                <p className="mb-0">{card.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;