import {Form} from "../form/Form";
import {FormInput} from "../formInput/FormInput";
import {useLocation} from "react-router-dom";
import React, {useState} from "react";


export function CreateArt() {
    const [error, setError] = useState("")
    const location = useLocation();
    const {email} = location.state || {};

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [filename, setFileName] = useState("")

    const uploadArt = () => {

    }

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
                    max-rows="5"
                />
                <FormInput
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <FormInput
                    label="File"
                    type="file"
                    name="filename"
                    id="filename"
                    value={filename}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                />
            </Form>
        </div>
    )
}