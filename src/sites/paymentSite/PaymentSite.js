import {Form} from "../../components/form/Form";
import React, {useState} from "react";
import {FormInput} from "../../components/formInput/FormInput";


export default function PaymentSite(){

    const [error, setError] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [name, setName] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [cvc, setCVC] = useState("")

    // Validation functions
    const validateFullName = (name) => /^[a-zA-Z]+ [a-zA-Z]+$/.test(name); // Requires a first and last name
    const validateCardNumber = (number) => /^\d{16}$/.test(number.replace(/\s/g, "")); // 4*4 digits
    const validateExpirationDate = (date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date); // MM/YY format
    const validateCVC = (cvc) => /^\d{3}$/.test(cvc);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 16) value = value.slice(0, 16);

        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        setCardNumber(formattedValue);
    };

    const handleExpirationDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4) value = value.slice(0, 4);

        if (value.length >= 2) {
            value = `${value.slice(0, 2)} / ${value.slice(2)}`;
        }
        setExpirationDate(value);
    };

    const handleCVCChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 3) value = value.slice(0, 3);
        setCVC(value);
    };

    function handleSubmit(e) {
        e.preventDefault()
        if (!validateFullName(name)) {
            setError("Please enter your full name without diacritics (e.g., Jon Doe).");
            return;
        }
        if (!validateCardNumber(cardNumber)) {
            setError("Please enter a valid 16-digit card number.");
            return;
        }
        if (!validateExpirationDate(expirationDate)) {
            setError("Please enter a valid expiration date (MM/YY).");
            return;
        }
        if (!validateCVC(cvc)) {
            setError("Please enter a valid 3-digit CVC.");
            return;
        }

        // TODO fetch data

        setError("");
        console.log("Payment details are valid. Proceeding to payment...");
    }

    return (
        <>
            <div className="cart-payment-wrapper mb-0">
                <div className="cart-payment-header">
                    <h1>Payment</h1>
                    <p className="mb-3">Please insert credit card information</p>
                </div>
            </div>
            <div className="login-container mt-0 pb-2 pt-2">
                <Form
                    onSubmit={handleSubmit}
                    error={error}
                    submitLabel="Pay now"
                    buttonClassName="button-dark"
                >
                    <FormInput
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="e.g. John Doe"
                        required
                    />
                    <FormInput
                        label="Card number"
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        required
                    />
                    <div className="space-between-for-two-components ml-0 mr-0 mb-0">
                        <FormInput
                            label="Expiration Date"
                            type="text"
                            value={expirationDate}
                            onChange={handleExpirationDateChange}
                            placeholder="MM / YY"
                            required
                        />
                        <FormInput
                            label="CVC"
                            type="text"
                            value={cvc}
                            onChange={handleCVCChange}
                            placeholder="CVC"
                            required
                        />
                    </div>
                </Form>

            </div>
        </>
    )
}