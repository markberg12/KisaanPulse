import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import "./Logins.css";
function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // For displaying error messages

    const handleApi = () => {
        if (!username || !password) {
            alert("Both username and password are required");
            return;
        }

        const url = 'http://localhost:4000/signup';
        const data = { username, password };

        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Signup failed. Please try again later.");
            });
    };

    return (
        <div className="signup-container">
            <Header />
            <h2>Welcome to Signup:</h2>
            <div className="form-group">
                <label htmlFor="username">USERNAME:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">PASSWORD:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="signup-btn" onClick={handleApi}>
                SIGNUP
            </button>
            {error && <p className="error-msg">{error}</p>}
            <p>
                Already have an account? <Link to="/login">LOGIN</Link>
            </p>
        </div>
    );
}

export default Signup;
