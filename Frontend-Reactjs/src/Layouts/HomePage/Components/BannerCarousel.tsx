import { useEffect, useState } from 'react';
import './BannerCarousel.css'; // Custom styles
import image1 from "../../../images/homebanner1.png"
import image2 from "../../../images/homebanner2.png"
import image3 from "../../../images/homebanner3.jpg"

export const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false); 
  const images = [
    image1,
    image2,
    image3,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true); 
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setTransitioning(false); 
      }, 2000); 
    }, 4000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="jumbotron position-relative text-center text-white overflow-hidden mb-0">
      <div className="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
      <div className="slideshow position-absolute top-0 start-0 w-100 h-100">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Banner ${index + 1}`}
            className={`img-fluid ${index === currentIndex ? 'visible' : ''} ${transitioning ? 'transitioning' : ''}`}
          />
        ))}
      </div>
      <div className="content position-relative z-index-2 d-flex flex-column justify-content-center align-items-center h-100">
        <h1 className="text-shadow">Welcome to Read Corner Bookstore!</h1>
        <h5 className="text-shadow">Discover your next great read.</h5>
      </div>
    </div>
  );
};
