import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCartPlus, FaSearch, FaUser, FaUserShield } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../context/TokenContext";
import { useSearchProducts } from "../../Hooks/filteredProductsHooks";
import { IBook } from "../../models/IBook";
import { useCart } from "../../Hooks/cartHooks";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  const { filteredProducts } = useSearchProducts(searchQuery);
  const { setToken }: any = useContext(tokenContext);

  const token = localStorage.getItem('token') || '';
  const isLoggedIn = !!token;

  const userString = localStorage.getItem('user');
  let isAdmin = false;
  if (userString) {
    isAdmin = JSON.parse(userString).role === "ADMIN";
  }

  const { data: cartData} = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (isLoggedIn && cartData?.cartItems) {
      setCartItemCount(cartData.cartItems.length);
    } else {
      setCartItemCount(0);
    }
  }, [isLoggedIn, cartData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value !== '');
  };

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    toast.success('Logged out successfully');
    navigate('/');
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-2'>
      <div className='container-fluid'>
        <Link to={"/"} className='navbar-brand'>|__Read Corner</Link>
        <button className='navbar-toggler' type='button'
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown' aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'> Home</Link>
            </li>
            <li className='nav-item me-3' style={{ whiteSpace: "nowrap", width: "fit-content" }}>
              <Link className='nav-link' to='/booksFilter'> Filter Books</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center me-auto position-relative" style={{ width: '500px' }}>
            <div className="input-group w-75">
              <input
                className="form-control"
                type="search"
                placeholder="Search your products here"
                aria-label="Search"
                onChange={handleSearch}
                value={searchQuery}
                style={{
                  fontSize: '14px',
                  color: '#C4C4C4',
                }}
              />
              <span className="input-group-text" style={{ backgroundColor: 'green' }}>
                <FaSearch style={{ width: '20px', height: '20px', color: 'white' }} />
              </span>
            </div>
            {showSearchResults && filteredProducts && (
              <div
                className="position-absolute bg-white w-75 mt-1 overflow-auto shadow-lg cursor-pointer"
                style={{
                  top: '100%',
                  left: '0',
                  zIndex: '50',
                  maxHeight: '450px',
                }}
              >
                {searchQuery &&
                  filteredProducts.map((item: IBook) => (
                    <div key={item.id}>
                      <button
                        className="w-100 bg-gray-100 mb-3 d-flex align-items-center gap-3 cursor-pointer"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          outline: 'none', 
                          height: '150px',
                        }}
                        onClick={() => {
                          navigate(`/book/${item.id}`, { state: { item } });
                          setShowSearchResults(false);
                          setSearchQuery('');
                        }}
                      >
                        <img
                          className="w-25"
                          src={item.bookCover}
                          alt="productImg"
                          style={{ maxWidth: '25%', maxHeight: '100%' }}
                        />
                        <div className="d-flex flex-column gap-1 flex-grow-1">
                          <p className="font-semibold text-lg">
                            {item.title}
                          </p>
                          <p className="text-xs">
                            {item.description && item.description.length > 40
                              ? `${item.description.slice(0, 40)}...`
                              : item.description}
                          </p>
                          <p className="text-sm">
                            Price:{' '}
                            <span className="text-primeColor font-semibold">
                              ${item.price}
                            </span>
                          </p>
                        </div>
                      </button>
                      <hr />
                    </div>
                  ))}
              </div>
            )}
          </div>

          {isLoggedIn && isAdmin && (
            <Link className="nav-link fs-5 text-light" to={'controlPanel'}>
              <FaUserShield className="me-2 fs-3" /> 
              Admin Panel
            </Link>
          )}

          {isLoggedIn && !isAdmin && (
            <Link className="nav-link fs-5 text-light" to={'controlPanel'}>
              <FaUser className="me-2 fs-3" /> 
              User Panel
            </Link>
          )}

          {isLoggedIn ? (
            <>
          <Link className="nav-link fs-5 text-light d-flex align-items-center position-relative me-2 mb-1" to={'cart'}>
            <span className="position-relative">
              <FaCartPlus className="fs-3 me-1"/>
              { (
                <span 
                  className="position-absolute badge rounded-pill bg-gradient p-1 " 
                  style={{
                    fontSize: '0.75em',
                    color: "orange",
                    bottom: '-25%',
                    right: '-10%',
                    transform: 'translate(25%, 25%)'
                  }}
                >
                  {cartItemCount || 0}
                </span>
              )}
            </span>
            <span className="ms-2">Cart</span>
          </Link>
              <button className="btn btn-danger ms-3" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-primary ms-3" to="/login">
                Login
              </Link>
              <Link className="btn btn-secondary ms-1" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
