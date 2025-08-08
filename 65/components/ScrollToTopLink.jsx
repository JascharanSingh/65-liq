import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ScrollToTopLink = ({ to, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    // Let browser handle if user wants new tab/window or context menu
    if (
      props.target === "_blank" ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 // not left-click
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
    // It's generally OK to scroll here,
    // but you could setTimeout(..., 10) to scroll *slightly* after navigation.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default ScrollToTopLink;