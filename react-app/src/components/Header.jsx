import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className='header-container d-flex justify-content-between'>
            <div className="header">
                {/* Logo / Home Link */}
                <Link className='links' to="/">ANGADI</Link>

                {/* Search Bar */}
                <input 
                    className='search' 
                    type='text'  
                    value={props?.search || ''}
                    onChange={(e) => props.handlesearch?.(e.target.value)}
                    placeholder="Search products..."
                />
                <button 
                    className='search-btn' 
                    onClick={() => props.handleClick?.()}
                >
                    SEARCH
                </button>
            </div>

            <div>
                {/* Conditional Buttons */}
                {localStorage.getItem('token') ? (
                    <>
                        <Link to="/add-product">
                            <button className="login-btn">SELL PRODUCTS</button>
                        </Link>
                        <button className="login-btn" onClick={handleLogout}>LOGOUT</button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className="login-btn">LOGIN</button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
