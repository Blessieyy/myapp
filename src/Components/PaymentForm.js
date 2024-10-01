import React, { useState } from 'react';


const PaymentForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        cardNumber: '',
        expiration: '',
        cvc: '',
        country: '',
        zip: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrorMessage(''); // Clear error message when typing
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple form validation
        if (!formData.email || !formData.cardNumber || !formData.expiration || !formData.cvc || !formData.zip) {
            setErrorMessage('All fields are required');
            return;
        }

        // Simulate payment processing
        setTimeout(() => {
            setPaymentSuccess(true);
        }, 1000); // Simulating network delay
    };

    return (
        <div className="payment-form-container">
            <h2>Stripe Credit Card</h2>

            {!paymentSuccess ? (
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Card Number */}
                    <div className="form-group">
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card number"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Card Icons */}
                    <div className="form-group icon-group">
                        <div className="icon-box">
                            <img src="visa-icon.png" alt="Visa" />
                        </div>
                        <div className="icon-box">
                            <img src="mastercard-icon.png" alt="MasterCard" />
                        </div>
                        <div className="icon-box">
                            <img src="amex-icon.png" alt="Amex" />
                        </div>
                        <div className="icon-box">
                            <img src="discover-icon.png" alt="Discover" />
                        </div>
                    </div>

                    {/* Expiration & CVC */}
                    <div className="form-row">
                        <div className="form-group half">
                            <input
                                type="text"
                                name="expiration"
                                placeholder="MM / YY"
                                value={formData.expiration}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group half">
                            <input
                                type="text"
                                name="cvc"
                                placeholder="CVC"
                                value={formData.cvc}
                                onChange={handleInputChange}
                                required
                            />
                            <img src="cvc-icon.png" alt="CVC Icon" className="cvc-icon" />
                        </div>
                    </div>

                    {/* Country */}
                    <div className="form-group">
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                        >
                            <option value="United States">Select Country</option>
                            {/* Add other countries if needed */}
                        </select>
                    </div>

                    {/* ZIP */}
                    <div className="form-group">
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP"
                            value={formData.zip}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Error message */}
                    {errorMessage && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}

                    {/* Submit button */}
                    <button type="submit" className="pay-button">
                        Pay Now
                    </button>
                </form>
            ) : (
                <div className="success-message">
                    Payment Successful! Thank you for your purchase.
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
