import React from 'react';
import { useNewArrival } from "../../../Hooks/productHooks";
import toast from "react-hot-toast";
import Spinner from "../../../Components/spinner/Spinner";
import Card from "../../../Components/card/Card";
import { Link } from "react-router-dom";

export const Carousel = () => {
    const { products: books = [], isLoading, error } = useNewArrival();

    if (isLoading) return <Spinner />;
    if (error) toast.error(error.message);

    return (
        <div className='container mt-5' style={{ height: '550px' }}>
            <div className='homepage-carousel-title mb-2 '>
                <h3 className='fadeInUp'>Find your next book, New Arrivals</h3>
            </div>
            
            {/* Desktop View */}
            <div id='carouselDesktop' className='carousel carousel-dark slide mt-2 d-none d-lg-block fadeInUp' data-bs-ride="carousel" data-bs-interval='false'>
                <div className='carousel-inner fadeInUp'>
                    {books && books.length > 0 && (
                        <>
                            {[0, 3, 6].map((startIndex) => (
                                <div className={`carousel-item ${startIndex === 0 ? 'active' : ''}`} key={startIndex}>
                                    <div className='row d-flex justify-content-center align-items-center p-3'>
                                        {books.slice(startIndex, startIndex + 3).map((book, index) => (
                                            <div className='col-3' key={book.productName || index} style={{ padding: '0 5px' }}>
                                                <Card product={book} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <button className='carousel-control-prev' type='button' data-bs-target='#carouselDesktop' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button' data-bs-target='#carouselDesktop' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* Mobile View */}
            <div id='carouselMobile' className='carousel carousel-dark slide mt-2 d-block d-lg-none fadeInUp' data-bs-ride="carousel" data-bs-interval='false'>
                <div className='carousel-inner fadeInUp'>
                    {books && books.length > 0 && (
                        <>
                            {books.map((book, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={book.productName || index}>
                                    <div className='row d-flex justify-content-center align-items-center'>
                                    <div className='col-9' key={book.productName || index} style={{ padding: '0 5px' }}>
                                    <Card product={book} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <button className='carousel-control-prev' type='button' data-bs-target='#carouselMobile' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button' data-bs-target='#carouselMobile' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            <div className='homepage-carousel-title mt-3 mb-5'>
                <Link className='btn btn-outline-secondary btn-lg fadeInUp' to='/booksFilter'>View More</Link>
            </div>
        </div>
    );
};

