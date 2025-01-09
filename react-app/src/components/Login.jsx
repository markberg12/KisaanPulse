import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import "./Logins.css";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // For displaying API error messages

    const handleApi = () => {
        if (!username || !password) {
            alert("Both username and password are required");
            return;
        }

        const url = 'http://localhost:4000/login';
        const data = { username, password };

        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);

                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        navigate('/'); // Navigate to the home page after login
                    }
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Login failed. Please check your credentials and try again.");
            });
    };

    return (
        <div className="login-container">
            <Header />
            <h2>Welcome to the Login:</h2>
            <div className="form-group">
                <label htmlFor="username">USERNAME:</label>
                <input
                    className="login-input"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">PASSWORD:</label>
                <input
                    className="login-input"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="login-btn" onClick={handleApi}>LOGIN</button>
            {error && <p className="error-msg">{error}</p>}
            <p>
                Don't have an account? <Link to="/signup">SIGN UP</Link>
            </p>
        </div>
    );
}

export default Login;
