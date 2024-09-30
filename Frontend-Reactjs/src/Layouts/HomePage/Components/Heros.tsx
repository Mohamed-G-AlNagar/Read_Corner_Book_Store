import { Link } from "react-router-dom";

export const Heros = () => {
    return (
        <div>
            <div className='d-none d-lg-block mt-5 mb-5'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Discover Your Next Great Read</h1>
                            <p className='lead'>
                                Embark on a literary journey with us! Share your reading adventures 
                                and let us guide you to new worlds of knowledge and imagination. 
                                Whether you're seeking personal growth or pure enjoyment, 
                                we're here to connect you with the perfect books.
                            </p>
                            <Link className='btn main-color btn-lg text-white' to='/signup'>Join Our Community</Link>
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>A Living Library at Your Fingertips</h1>
                            <p className='lead'>
                                Experience the thrill of a constantly evolving collection! 
                                Our dedicated team curates a dynamic selection of books, 
                                ensuring you always have access to the latest and most relevant titles. 
                                From cutting-edge research to timeless classics, 
                                we're committed to fueling your passion for learning and discovery.
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>Discover Your Next Great Read</h1>
                            <p className='lead'>
                                Embark on a literary journey with us! Share your reading adventures 
                                and let us guide you to new worlds of knowledge and imagination. 
                                Whether you're seeking personal growth or pure enjoyment, 
                                we're here to connect you with the perfect books.
                            </p>
                            <Link className='btn main-color btn-lg text-white' to='/signup'>Join Our Community</Link>
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>A Living Library at Your Fingertips</h1>
                            <p className='lead'>
                                Experience the thrill of a constantly evolving collection! 
                                Our dedicated team curates a dynamic selection of books, 
                                ensuring you always have access to the latest and most relevant titles. 
                                From cutting-edge research to timeless classics, 
                                we're committed to fueling your passion for learning and discovery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}