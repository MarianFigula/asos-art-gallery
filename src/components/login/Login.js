import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../form/form.css"
import "../../spacing.css"
import {FormInput} from "../formInput/FormInput";
import {Form} from "../form/Form";

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
            <Form onSubmit={handleSubmit}
                  error={error}
                  submitLabel="Sign In"
                  buttonClassName="button-dark">
                <FormInput
                    label="Email"
                    type="email"
                    value=""
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    value=""
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

            </Form>

            <div className="links">
                <Link to="/register">Register</Link>
                <Link to="/forgot-password">Forgot password?</Link>
            </div>
        </div>


    )
}