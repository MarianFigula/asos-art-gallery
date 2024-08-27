import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

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

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    async function handleSubmit(event){
        event.preventDefault()

        try {
            const response = await fetch(`${serverUrl}/api/user/register.php`, {
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
            setError("Register failed. Please try again")
        }

    }

    return (
        <div className="login-container">
            <h2>Register</h2>
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
                    <label>Security Answer:</label>
                    <input
                        type="text"
                        value={securityAnswer}
                        onChange={(e) =>
                            setSecurityAnswer(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>


    )
}