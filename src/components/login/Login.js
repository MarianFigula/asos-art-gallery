import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../form/form.css"
import "../../spacing.css"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    async function handleSubmit(event){
        event.preventDefault()

        try {
            const response = await fetch(`${serverUrl}/api/user/login.php`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password})
                })

            const data = await response.json()
            data.success ? navigate("/") : setError(data.message)

        } catch (error){
            setError("Login failed. Please try again")
        }

    }

    return (
        <div className="login-container">
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="label mb-0-25">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="label mb-0-25">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit" className="button-dark">Sign in</button>
            </form>
            <div className="links">
                <Link to="/register">Register</Link>
                <Link to="/forgot-password">Forgot password?</Link>
            </div>
        </div>


    )
}