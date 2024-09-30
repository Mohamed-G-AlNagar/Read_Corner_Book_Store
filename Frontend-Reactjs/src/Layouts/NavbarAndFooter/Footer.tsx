import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className='main-color'>
            <footer className='container d-flex flex-wrap 
                justify-content-between align-items-center py-3 main-color'>
                <p className='col-md-4 mb-0 text-white'>© Read Corner Library </p>
                <ul className='nav navbar-dark col-md-4 justify-content-end'>
                    <li className='nav-item'>
                        <Link to='/' className='nav-link px-2 text-white'>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/booksFilter' className='nav-link px-2 text-white'>
                            Filter Books
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    );
}