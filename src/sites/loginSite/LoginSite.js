import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../components/form/form.css";
import "../../spacing.css";
import { FormInput } from "../../components/formInput/FormInput";
import { Form } from "../../components/form/Form";
import axios from "axios";

export function LoginSite() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post(
                `${serverUrl}/api/user/login.php`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // NEW WAY
            const data = response.data;
            if (data.success) {
                localStorage.setItem("jwtToken", data.token); // Save the JWT token
                console.log(
                    "Token saved in localStorage:",
                    localStorage.getItem("jwtToken")
                );

                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Login failed. Please try again");
        }
    }

    return (
        <div className="login-container">
            <h2>Sign in</h2>
            <Form
                onSubmit={handleSubmit}
                error={error}
                submitLabel="Sign In"
                buttonClassName="button-dark"
            >
                <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form>

            <div className="links">
                <Link to="/register">Register</Link>
                <Link to="/forgot-password">Forgot password?</Link>
            </div>
        </div>
    );
}
