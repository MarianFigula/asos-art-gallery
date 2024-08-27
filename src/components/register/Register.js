import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../login/Login.css"

export function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [securityQuestions] = useState([
        "ds", "ds", "ds", "ds"
    ])
    const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState("")

    const [securityAnswer, setSecurityAnswer] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()

        try {
            const response = await fetch("http://localhost:80/api/user/register.php", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        email,
                        password,
                        selectedSecurityQuestion,
                        setSecurityAnswer
                    })
            })

            const data = await response.json()
            data.success ? navigate("/dasboard") : setError(data.message)

        } catch (error){
            setError("Login failed. Please try again")
        }

    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Repeat password:</label>
                    <input
                        type="password"
                        value={repeatedPassword}
                        onChange={(e) =>
                            setRepeatedPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Security question:</label>
                    <select>
                        {securityQuestions.map(securityQuestion =>
                            <option value={securityQuestion}>
                                {securityQuestion}
                            </option>)}
                    </select>
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="text"
                        value={securityAnswer}
                        onChange={(e) =>
                            setSecurityAnswer(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>


    )
}