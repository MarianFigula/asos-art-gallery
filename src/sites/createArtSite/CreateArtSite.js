import {Form} from "../../components/form/Form";
import {FormInput} from "../../components/formInput/FormInput";
import {useLocation} from "react-router-dom";
import React, {useState} from "react";


export function CreateArtSite() {
    const [error, setError] = useState("");
    const email = localStorage.getItem("user-email") || "";
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);  // Update state for file
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const uploadArt = async (event) => {
        event.preventDefault();

        if (title === "" || description === "" || price < 0 || !file) {
            setError("Some inputs are filled incorrectly");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('file', file);  // Append file to FormData

            const response = await fetch(`${serverUrl}/api/art/create.php`, {
                method: "POST",
                body: formData  // Send formData directly
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    return (
        <div className="login-container">
            <h2>Upload Art</h2>
            <Form onSubmit={uploadArt}
                  error={error}
                  submitLabel="Upload Art"
                  buttonClassName="button-dark mb-1">
                <FormInput
                    label="Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <FormInput
                    label="Description"
                    type="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <FormInput
                    label="Price €"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <FormInput
                    label="File"
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}  // Update file state
                    required
                />
            </Form>
        </div>
    )
}