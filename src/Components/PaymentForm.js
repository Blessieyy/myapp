import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePay } from '@fortawesome/free-brands-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { db } from './firebase';


const PaymentForm = () => {


    const [email, setEmail] = useState('');
    const stripe = useStripe(); // Correct hook usage for Stripe
    const elements = useElements(); // Correct hook usage for Stripe Elements
    const [errorMessage, setErrorMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Card'); // State for payment method
    const [userName, setUserName] = useState(''); // State to hold the user's name
    const [surname, setSurname] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null); // State to hold the selected room

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(userData.userName);
                    setSurname(userData.surname);
                }
            }
        });

        return () => unsubscribe();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet
            return;
        }
        setIsProcessing(true);

        // Retrieve the card element for secure input
        const cardElement = elements.getElement(CardElement); // Use 'cardElement' not 'CardElement'

        // Create a payment method via Stripe Elements
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('[PaymentMethod Error]', error);
            setIsProcessing(false);
            return;
        }

        const response = await fetch({
            method: 'POST',
            headers: {

            },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                amount: 9000,
            }),
        });
        const result = await response.json();
        if (result.error) {
            console.error(result.error);
            setIsProcessing(false);
        } else {
            console.log('Payment Successful:', result.paymentIntent);
            setIsProcessing(false);
        }
    };

    return (
        <div className='payment-container'>
            <header className="header">
                <button className="back-button">
                    <i className="fas fa-arrow-left"><FontAwesomeIcon icon={faBackward} /></i>
                </button>
                <h1 className="room-header">Payment Form</h1>
                <div className="username-section">
                    <i className="fas fa-user-circle"></i>
                    <span>{userName} {surname}</span>
                </div>
            </header>

            <div className="payment-form">
                <h1 className='payhead'>Payment Form</h1>
                <div className="payment-methods">

                    <button
                        className={paymentMethod === 'Card' ? 'active' : ''}
                        onClick={() => setPaymentMethod('Card')}
                    >
                        <span role="img" aria-label="card">💳</span> Card
                    </button>
                    <button
                        className={paymentMethod === 'ApplePay' ? 'active' : ''}
                        onClick={() => setPaymentMethod('ApplePay')}
                    >
                        <span role="img" aria-label="apple-pay"></span> Apple Pay
                    </button>
                    <button
                        className={paymentMethod === 'Google' ? 'active' : ''}
                        onClick={() => setPaymentMethod('GooglePay')}
                    >
                        <span role="img" aria-label="apple-pay"><FontAwesomeIcon icon={faGooglePay} /></span> Pay
                    </button>

                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label >Card number</label>
                        <CardElement id="card-element" placeholder="**** **** **** ****" />
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select id="country">
                            <option value="SA">South Africa</option>
                            <option value="US">United States</option>
                            <option value="DE">Germany</option>
                            <option value="UK">United Kingdom</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input type="text" id="postal-code" placeholder="12345" />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isProcessing || !stripe}>
                        {isProcessing ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
