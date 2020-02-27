import React, { useState, useEffect } from "react";
import { Transaction, Card } from "@paystack/checkout-js";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import {
  cardNumberFormatter,
  masterCardDiscount,
  cardExpiryFormatter,
  cardCvvFormatter,
  cardExpiryMonthandYearSplit,
  reference
} from "./utils";

import "./payment.styles.scss";

import PayStackLogo from "../../assets/paystack.jpg";
import NairaboxLogo from "../../assets/nairabox.png";

const PaymentPage = ({ amount, email, publicKey, callback }) => {
  const [usersData, setUsersData] = useState({
    amount: 0,
    email: "",
    publicKey: ""
  });
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);

  useEffect(() => {
    setUsersData({ amount, email, publicKey });
  }, [amount, email, publicKey]);

  const handleCardNumberChange = event => {
    const { value } = event.target;
    setDiscountedAmount(masterCardDiscount(value, usersData.amount));
    setCardNumber(cardNumberFormatter(value));
  };

  const handleCardExpiryChange = event => {
    const { value } = event.target;
    setCardExpiry(cardExpiryFormatter(value));
  };

  const handleCvvChange = event => {
    const { value } = event.target;
    setCvv(cardCvvFormatter(value));
  };

  const transactionData = {
    email: usersData.email,
    amount: discountedAmount,
    key: usersData.publicKey
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const expiry = cardExpiryMonthandYearSplit(cardExpiry);

    const transaction = await Transaction.request(transactionData);

    const card = {
      number: cardNumber,
      cvv: cvv,
      month: expiry[0],
      year: expiry[1],
      pin: '1234'
    };

    const validation = Card.validate(card);

    if (validation.isValid) {
      await transaction.setCard(card);
      const { data, status } = await transaction.chargeCard();

      try {
        if (status === "success") {
          const referenceId = await reference(data)
          callback(referenceId);
        }
      } catch (error) {
        console.log('Incompleted transaction', error.message);
      }
    } else {
      alert("Please, verify your card details");
    }
   };

  return (
    <div className="payment">
      <div className="header">
        <img className="paystack-logo" alt="paystack" src={PayStackLogo} />
        <img className="nairabox-logo" alt="nairabox" src={NairaboxLogo} />
      </div>
      <hr />
      {usersData.amount && usersData.email && usersData.publicKey ? (
        <div>
          <h5 className="title">Enter your card details to pay</h5>
          <form className="payment-form" onSubmit={handleSubmit}>
            <FormInput
              name="cardNumber"
              type="tel"
              label="CARD NUMBER"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              handleChange={handleCardNumberChange}
              cardNum
              required
            />
            <div className="card-remain">
              <FormInput
                name="cardExpiry"
                type="tel"
                label="CARD EXPIRY"
                placeholder="MM/YY"
                value={cardExpiry}
                handleChange={handleCardExpiryChange}
                card
                required
              />
              <FormInput
                name="cvv"
                type="tel"
                label="CVV"
                placeholder="123"
                value={cvv}
                handleChange={handleCvvChange}
                card
                required
              />
            </div>
            <CustomButton type="submit">
              Pay NGN {discountedAmount}
            </CustomButton>
          </form>
        </div>
      ) : (
        <h5 className="expect-message">
          Please provides amount, email and paystack public key
        </h5>
      )}

      <a
        href="https://paystack.com/why-choose-paystack"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>
          Secured by <span className="pay-naira">paystack</span> &amp;{" "}
          <span className="pay-naira">nairabox</span>
        </p>
      </a>
    </div>
  );
};

export default PaymentPage;
